import { useState } from "react";
import { auth } from "../firebaseConfig";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface AuthProps {
  children?: React.ReactNode;
}

export default function Auth({ children }: AuthProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(auth.currentUser);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const moveToShop = () => {
    setIsOpen(false);
    window.location.href = "/shop";
  };

  const handleSignup = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      setIsOpen(false);
      toast({
        title: "Account created!",
        description: "Welcome to our platform.",
      });
      setTimeout(() => {
        moveToShop();
      }, 4000);
    } catch (error) {
      toast({
        title: "Signup failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setUser(auth.currentUser);
      setIsOpen(false);
      moveToShop();
    } catch (error) {
      toast({
        title: "Login failed",
        description: (error as Error).message,
        variant: "destructive",
      });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="glass">
        <DialogHeader>
          <DialogTitle className="gradient-text">Login / Signup</DialogTitle>
        </DialogHeader>
        {!user ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSignup} className="flex-1">
                Sign Up
              </Button>
              <Button onClick={handleLogin} variant="outline" className="flex-1">
                Login
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Welcome, {user.email}</h3>
            <Button onClick={moveToShop} variant="outline" className="w-full">
              Shop
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-full">
              Logout
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
