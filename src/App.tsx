import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Shop from "./pages/shop";
import OrderSuccess from "./pages/OrderSuccess";
import ContactUs from "./pages/ContactUs";
import TermsandConditions from "./pages/TermsandConditions";
import NotFound from "./pages/NotFound";
import Auth from "./components/Auth";
import Orders from "./components/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/TermsandConditions" element={<TermsandConditions />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
