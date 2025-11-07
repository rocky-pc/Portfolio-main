import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ShaderAnimation } from '@/components/ui/shader-animation';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Coins, Trophy, Target, Zap, ArrowRight, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

// Declare Cashfree globally
declare global {
  interface Window {
    Cashfree: any;
  }
}

interface GameResult {
  id: string;
  guess: number;
  target: number;
  difference: number;
  coinsWon: number;
  coinsSpent: number;
  timestamp: Date;
}

const Game: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);
  const [coins, setCoins] = useState(0);
  const [gameState, setGameState] = useState<'menu' | 'playing' | 'result'>('menu');
  const [guess, setGuess] = useState('');
  const [targetNumber, setTargetNumber] = useState(0);
  const [gameResult, setGameResult] = useState<GameResult | null>(null);
  const [gameHistory, setGameHistory] = useState<GameResult[]>([]);
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [orderId, setOrderId] = useState<string>('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        await loadUserData(user.uid);
        await loadGameHistory(user.uid);
      } else {
        navigate('/auth');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  const loadUserData = async (userId: string) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        setCoins(userDoc.data().coins || 0);
      } else {
        await setDoc(doc(db, 'users', userId), { coins: 0, email: user.email });
        setCoins(0);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const loadGameHistory = async (userId: string) => {
    try {
      const historyDoc = await getDoc(doc(db, 'gameHistory', userId));
      if (historyDoc.exists()) {
        const history = historyDoc.data().games || [];
        setGameHistory(history.sort((a: GameResult, b: GameResult) => b.timestamp.getTime() - a.timestamp.getTime()));
      }
    } catch (error) {
      console.error('Error loading game history:', error);
    }
  };

  const startGame = () => {
    if (coins < 10) {
      alert('Not enough coins! Buy more coins first.');
      return;
    }
    const newTarget = Math.floor(Math.random() * 100) + 1;
    setTargetNumber(newTarget);
    setGameState('playing');
    setGuess('');
  };

  const submitGuess = async () => {
    const guessNum = parseInt(guess);
    if (isNaN(guessNum) || guessNum < 1 || guessNum > 100) {
      alert('Please enter a valid number between 1 and 100');
      return;
    }

    const difference = Math.abs(guessNum - targetNumber);
    let coinsWon = 0;

    if (difference === 0) {
      coinsWon = 50; // Perfect guess
    } else if (difference <= 5) {
      coinsWon = 20; // Very close
    } else if (difference <= 15) {
      coinsWon = 10; // Close
    } else if (difference <= 30) {
      coinsWon = 5; // Somewhat close
    }

    const newCoins = coins - 10 + coinsWon;
    setCoins(newCoins);

    const result: GameResult = {
      id: Date.now().toString(),
      guess: guessNum,
      target: targetNumber,
      difference,
      coinsWon,
      coinsSpent: 10,
      timestamp: new Date(),
    };

    setGameResult(result);
    setGameState('result');

    // Update user coins
    await updateDoc(doc(db, 'users', user.uid), { coins: newCoins });

    // Save game result
    const newHistory = [result, ...gameHistory];
    setGameHistory(newHistory);
    await setDoc(doc(db, 'gameHistory', user.uid), { games: newHistory });
  };

  const buyCoins = async () => {
    const totalAmount = 10; // 10 Rs for 100 coins
    const generatedOrderId = "game_coins_" + Date.now();
    setOrderId(generatedOrderId);

    try {
      const res = await fetch("/.netlify/functions/createOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderId: generatedOrderId,
          amount: totalAmount,
          customerName: user.displayName || user.email,
          customerEmail: user.email,
          customerPhone: "9999999999", // Default phone, could be improved
        }),
      });

      const data = await res.json();
      if (!data.payment_session_id) throw new Error("No payment session id");

      const paymentSessionId = data.payment_session_id;
      const returnUrl = `${window.location.origin}/game?order_id=${generatedOrderId}&verify=true`;

      const cashfree = window.Cashfree({ mode: "sandbox" });

      cashfree
        .checkout({
          paymentSessionId,
          redirectTarget: "_modal",
          returnUrl,
        })
        .then(async (result: any) => {
          if (result.paymentDetails) {
            // Add coins to user account
            const newCoins = coins + 100;
            setCoins(newCoins);
            await updateDoc(doc(db, 'users', user.uid), { coins: newCoins });
            setShowBuyDialog(false);
            alert('Coins purchased successfully!');
          }
        })
        .catch((err: any) => {
          console.error("Cashfree error:", err);
          alert("Payment failed. Please try again.");
        });
    } catch (e) {
      console.error(e);
      alert("Could not start payment. Please try again.");
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setGameResult(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <ShaderAnimation />
      </div>
      <Navigation />

      <main className="container mx-auto px-6 py-8 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 gradient-text">Number Guessing Game</h1>
          <p className="text-muted-foreground">Test your luck and logic! Guess the number between 1-100</p>
        </div>

        {/* Coins Display */}
        <div className="flex justify-center mb-8">
          <Card className="glass">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Coins className="w-8 h-8 text-yellow-500" />
                <div>
                  <div className="text-2xl font-bold gradient-text">{coins}</div>
                  <div className="text-sm text-muted-foreground">Coins</div>
                </div>
                <Button onClick={() => setShowBuyDialog(true)} className="ml-4">
                  <Zap className="w-4 h-4 mr-2" />
                  Buy 100 Coins (₹10)
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Area */}
        <div className="max-w-2xl mx-auto">
          {gameState === 'menu' && (
            <Card className="glass">
              <CardHeader className="text-center">
                <CardTitle className="gradient-text">Ready to Play?</CardTitle>
                <CardDescription>
                  Each game costs 10 coins. Win coins based on how close your guess is to the target number!
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="p-3 bg-green-500/10 rounded-lg">
                    <div className="font-semibold text-green-400">Perfect Guess (0 difference)</div>
                    <div>Win 50 coins</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg">
                    <div className="font-semibold text-blue-400">Very Close (1-5 difference)</div>
                    <div>Win 20 coins</div>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-lg">
                    <div className="font-semibold text-purple-400">Close (6-15 difference)</div>
                    <div>Win 10 coins</div>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-lg">
                    <div className="font-semibold text-orange-400">Somewhat Close (16-30 difference)</div>
                    <div>Win 5 coins</div>
                  </div>
                </div>
                <Button onClick={startGame} size="lg" className="w-full">
                  <Target className="w-5 h-5 mr-2" />
                  Start Game (10 Coins)
                </Button>
              </CardContent>
            </Card>
          )}

          {gameState === 'playing' && (
            <Card className="glass">
              <CardHeader className="text-center">
                <CardTitle className="gradient-text">Guess the Number!</CardTitle>
                <CardDescription>I'm thinking of a number between 1 and 100...</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center">
                  <Label htmlFor="guess" className="text-lg">Your Guess</Label>
                  <Input
                    id="guess"
                    type="number"
                    min="1"
                    max="100"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    className="text-center text-2xl mt-2"
                    placeholder="Enter 1-100"
                  />
                </div>
                <Button onClick={submitGuess} className="w-full" size="lg">
                  <ArrowRight className="w-5 h-5 mr-2" />
                  Submit Guess
                </Button>
              </CardContent>
            </Card>
          )}

          {gameState === 'result' && gameResult && (
            <Card className="glass">
              <CardHeader className="text-center">
                <CardTitle className="gradient-text">
                  {gameResult.difference === 0 ? '🎉 Perfect Guess!' : 'Game Result'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <div className="text-6xl">
                    {gameResult.difference === 0 ? '🎯' : gameResult.difference <= 5 ? '🔥' : gameResult.difference <= 15 ? '👍' : '😅'}
                  </div>
                  <div className="space-y-2">
                    <div className="text-xl">Your guess: <span className="font-bold">{gameResult.guess}</span></div>
                    <div className="text-xl">Target number: <span className="font-bold">{gameResult.target}</span></div>
                    <div className="text-lg">Difference: <span className="font-bold">{gameResult.difference}</span></div>
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Coins spent:</span>
                      <span className="text-red-400">-10</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Coins won:</span>
                      <span className="text-green-400">+{gameResult.coinsWon}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between text-xl font-bold">
                      <span>Net result:</span>
                      <span className={gameResult.coinsWon - 10 >= 0 ? 'text-green-400' : 'text-red-400'}>
                        {gameResult.coinsWon - 10 >= 0 ? '+' : ''}{gameResult.coinsWon - 10}
                      </span>
                    </div>
                  </div>
                </div>
                <Button onClick={resetGame} className="w-full" size="lg">
                  <Trophy className="w-5 h-5 mr-2" />
                  Play Again
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Game History */}
        {gameHistory.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Recent Games</h2>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {gameHistory.slice(0, 6).map((result) => (
                <Card key={result.id} className="glass">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm text-muted-foreground">
                        {result.timestamp.toLocaleDateString()}
                      </div>
                      <Badge variant={result.difference === 0 ? "default" : "secondary"}>
                        {result.difference === 0 ? 'Perfect!' : `${result.difference} off`}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div>Guess: {result.guess} | Target: {result.target}</div>
                      <div className="flex justify-between">
                        <span>Spent: 10</span>
                        <span className="text-green-400">Won: {result.coinsWon}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Buy Coins Dialog */}
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle className="gradient-text">Buy Game Coins</DialogTitle>
            <DialogDescription>
              Purchase 100 coins for ₹10 to fuel your gaming adventures!
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-primary/5 rounded-lg">
              <div className="flex justify-between items-center">
                <span>100 Coins</span>
                <span className="font-bold">₹10</span>
              </div>
            </div>
            <Button onClick={buyCoins} className="w-full">
              <Coins className="w-4 h-4 mr-2" />
              Pay ₹10 & Get 100 Coins
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Game;
