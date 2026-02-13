import { useState } from "react";
import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Building2, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth-content";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { login } = useAuth();
  const [, setLocation] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsAuthenticating(true);

    const result = await login(email, password, rememberMe);

    setIsAuthenticating(false);

    if (result.success) {
      // Redirect will happen via AuthContext/Router
      // But we can also manually redirect based on role
      const storedUser = sessionStorage.getItem("co-lending-user");
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const redirectPath = user.role === "NBFC_ADMIN" ? "/nbfc/dashboard" : "/bank/dashboard";
        setLocation(redirectPath);
      }
    } else {
      setError(result.error || "Authentication failed");
    }
  };


return (
  <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-white">
    
    {/* LEFT SIDE – IMAGE ONLY */}
    <div className="hidden md:block">
      <img
        src="/loginimg.jpg"
        alt="Login visual"
        className="h-full w-full object-cover"
      />
    </div>

    {/* RIGHT SIDE – SAME FORM AS BEFORE */}
    <div className="flex items-center justify-center p-4">
      <Card className="max-w-md w-full p-8 bg-[#fafafa]"> 
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Building2 className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold mb-2">Co-Lending Platform</h1>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">User ID / Email</Label>
            <Input
              id="email"
              type="text"
              placeholder="admin@nbfc.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isAuthenticating}
              required
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
              disabled={isAuthenticating}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md p-3">
              {error}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked === true)}
              disabled={isAuthenticating}
            />
            <Label htmlFor="remember" className="text-sm font-normal">
              Remember me
            </Label>
          </div>

          <Button
            type="submit"
            className="w-full"
            size="lg"
            disabled={isAuthenticating}
          >
            {isAuthenticating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Authenticating...
              </>
            ) : (
              "Sign In"
            )}
          </Button>

          <div className="text-center">
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-sm text-muted-foreground underline cursor-not-allowed"
                  disabled
                >
                  Forgot password?
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Demo only - Password reset not available</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground text-center mb-2">
            Demo Credentials:
          </p>
          <div className="text-xs text-muted-foreground space-y-1 text-center">
            <p className="font-mono">NBFC: admin@nbfc.com / nbfc123</p>
            <p className="font-mono">Bank: admin@bank.com / bank123</p>
          </div>
        </div>
      </Card>
    </div>
  </div>
);

}




