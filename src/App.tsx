import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./pages/Welcome";
import BrainDump from "./pages/BrainDump";
import Context from "./pages/Context";
import Processing from "./pages/Processing";
import Diagnosis from "./pages/Diagnosis";
import Paths from "./pages/Paths";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/brain-dump" element={<BrainDump />} />
          <Route path="/context" element={<Context />} />
          <Route path="/processing" element={<Processing />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/paths" element={<Paths />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
