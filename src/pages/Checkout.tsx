import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { Shield, Truck, Clock, AlertCircle, Star, CheckCircle, TrendingUp } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import caseAdaptadaImage from "@/assets/case-adaptada.jpg";
import { PixPaymentModal } from "@/components/PixPaymentModal";

interface CheckoutState {
  selectedColor: string;
  quantity: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as CheckoutState;

  const [cep, setCep] = useState("");
  const [address, setAddress] = useState({
    street: "",
    neighborhood: "",
    city: "",
    state: "",
  });
  const [isLoadingCep, setIsLoadingCep] = useState(false);
  const [selectedShipping, setSelectedShipping] = useState("free");
  const [addUpsell, setAddUpsell] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    number: "",
    complement: "",
  });
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutos
  const [showPixModal, setShowPixModal] = useState(false);

  // Timer de urgência
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Buscar CEP
  const handleCepSearch = async () => {
    if (cep.length !== 8) {
      toast({
        title: "CEP inválido",
        description: "Por favor, digite um CEP com 8 dígitos",
        variant: "destructive",
      });
      return;
    }

    setIsLoadingCep(true);
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP digitado e tente novamente",
          variant: "destructive",
        });
        return;
      }

      setAddress({
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      });

      toast({
        title: "Endereço encontrado!",
        description: "Preencha os dados restantes para continuar",
      });
    } catch (error) {
      toast({
        title: "Erro ao buscar CEP",
        description: "Tente novamente em alguns instantes",
        variant: "destructive",
      });
    } finally {
      setIsLoadingCep(false);
    }
  };

  const productPrice = 9.9;
  const upsellPrice = 9.9;
  const shippingCost = selectedShipping === "express" ? 5.9 : 0;
  const subtotal = productPrice + (addUpsell ? upsellPrice : 0);
  const total = subtotal + shippingCost;

  const handleFinalizePurchase = () => {
    // Validação básica
    if (!formData.name || !formData.email || !formData.phone || !cep || !formData.number) {
      toast({
        title: "Preencha todos os campos obrigatórios",
        description: "Precisamos de suas informações para processar o pedido",
        variant: "destructive",
      });
      return;
    }

    // Abrir modal de pagamento PIX
    setShowPixModal(true);
  };

  const handlePaymentSuccess = () => {
    toast({
      title: "🎉 Pedido Confirmado!",
      description: "Você receberá um email com os detalhes da entrega",
    });
    
    // Redirecionar para página inicial após 3 segundos
    setTimeout(() => {
      navigate("/");
    }, 3000);
  };

  if (!state?.selectedColor) {
    navigate("/");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Fixo */}
      <div className="sticky top-0 z-50 bg-primary text-primary-foreground py-3 px-4 shadow-lg">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="h-5 w-5 animate-pulse" />
            <span className="font-bold text-sm md:text-base">
              Oferta expira em: {formatTime(timeLeft)}
            </span>
          </div>
          <div className="hidden md:flex items-center gap-2 text-sm">
            <Shield className="h-4 w-4" />
            <span>Compra 100% Segura</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Coluna Principal - Formulário */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alerta de Urgência */}
            <Card className="bg-accent/10 border-accent p-4 animate-pulse-subtle">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="font-bold text-sm md:text-base">⚡ Apenas 3 unidades restantes!</p>
                  <p className="text-xs md:text-sm text-muted-foreground">
                    Garanta a sua agora antes que acabe o estoque
                  </p>
                </div>
              </div>
            </Card>

            {/* Dados Pessoais */}
            <Card className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-display font-bold">Seus Dados</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    placeholder="João Silva"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="mt-1.5"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="joao@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">WhatsApp *</Label>
                    <Input
                      id="phone"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="mt-1.5"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Endereço de Entrega */}
            <Card className="p-4 md:p-6 space-y-4">
              <h2 className="text-xl md:text-2xl font-display font-bold">Endereço de Entrega</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <div className="flex gap-2 mt-1.5">
                    <Input
                      id="cep"
                      placeholder="00000-000"
                      value={cep}
                      onChange={(e) => setCep(e.target.value.replace(/\D/g, ""))}
                      maxLength={8}
                    />
                    <Button onClick={handleCepSearch} disabled={isLoadingCep} variant="outline">
                      {isLoadingCep ? "Buscando..." : "Buscar"}
                    </Button>
                  </div>
                </div>

                {address.street && (
                  <>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="md:col-span-2">
                        <Label htmlFor="street">Rua</Label>
                        <Input id="street" value={address.street} disabled className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="number">Número *</Label>
                        <Input
                          id="number"
                          placeholder="123"
                          value={formData.number}
                          onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                          className="mt-1.5"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="complement">Complemento</Label>
                      <Input
                        id="complement"
                        placeholder="Apto 45, Bloco B"
                        value={formData.complement}
                        onChange={(e) => setFormData({ ...formData, complement: e.target.value })}
                        className="mt-1.5"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="neighborhood">Bairro</Label>
                        <Input id="neighborhood" value={address.neighborhood} disabled className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="city">Cidade</Label>
                        <Input id="city" value={address.city} disabled className="mt-1.5" />
                      </div>
                      <div>
                        <Label htmlFor="state">Estado</Label>
                        <Input id="state" value={address.state} disabled className="mt-1.5" />
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Card>

            {/* Opções de Frete */}
            {address.street && (
              <Card className="p-4 md:p-6 space-y-4">
                <h2 className="text-xl md:text-2xl font-display font-bold">Escolha o Frete</h2>
                <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 border-2 border-accent bg-accent/5 rounded-lg p-4 cursor-pointer">
                      <RadioGroupItem value="free" id="free" />
                      <Label htmlFor="free" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <Truck className="h-5 w-5 text-accent" />
                            <div>
                              <p className="font-bold">Frete Grátis</p>
                              <p className="text-xs text-muted-foreground">Entrega em 7-10 dias úteis</p>
                            </div>
                          </div>
                          <span className="font-bold text-accent">GRÁTIS</span>
                        </div>
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 border-2 border-border rounded-lg p-4 cursor-pointer">
                      <RadioGroupItem value="express" id="express" />
                      <Label htmlFor="express" className="flex-1 cursor-pointer">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <TrendingUp className="h-5 w-5" />
                            <div>
                              <p className="font-bold">Frete Expresso</p>
                              <p className="text-xs text-muted-foreground">Entrega em 3-5 dias úteis</p>
                            </div>
                          </div>
                          <span className="font-bold">R$ 5,90</span>
                        </div>
                      </Label>
                    </div>
                  </div>
                </RadioGroup>
              </Card>
            )}

            {/* Upsell - Case Adaptada - Só aparece após selecionar frete */}
            {address.street && (
              <Card className="p-4 md:p-6 bg-gradient-to-br from-accent/10 to-accent/5 border-2 border-accent">
                <div className="space-y-4">
                  <div className="flex flex-col md:flex-row items-center gap-4">
                    {/* Imagem - maior e object-contain para não cortar */}
                    <div className="w-32 h-32 md:w-36 md:h-36 bg-white rounded-lg overflow-hidden flex items-center justify-center p-3">
                      <img 
                        src={caseAdaptadaImage} 
                        alt="Case Adaptada" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-col md:flex-row items-center md:items-start gap-2 mb-2">
                      <span className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-xs font-bold">
                          🔥 BLACK FRIDAY
                        </span>
                        <span className="text-sm text-muted-foreground line-through">De R$ 19,90</span>
                      </div>
                      <h3 className="text-lg md:text-xl font-display font-bold mb-2">
                        Case Adaptada por apenas R$ 9,90!
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Proteção premium que se adapta perfeitamente. Último dia de Black Friday!
                      </p>
                      <div className="flex flex-col md:flex-row items-start gap-2 text-sm text-accent font-semibold mb-3">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Alta qualidade</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          <span>Proteção extra</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <Button
                    onClick={() => setAddUpsell(!addUpsell)}
                    variant={addUpsell ? "default" : "outline"}
                    className="w-full text-base font-bold"
                    size="lg"
                  >
                    {addUpsell ? "✓ Adicionado ao Pedido" : "+ Adicionar Case por R$ 9,90"}
                  </Button>
                </div>
              </Card>
            )}

            {/* Provas Sociais */}
            <Card className="p-4 md:p-6 bg-secondary">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                      ))}
                    </div>
                    <span className="font-bold">4.9/5.0</span>
                  </div>
                  <span className="text-sm text-muted-foreground">500+ avaliações</span>
                </div>
                <p className="text-sm">
                  <span className="font-bold">+200 pessoas</span> compraram este produto nas últimas 24 horas
                </p>
              </div>
            </Card>
          </div>

          {/* Coluna Lateral - Resumo */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-4">
              <Card className="p-4 md:p-6 space-y-4">
                <h2 className="text-xl font-display font-bold">Resumo do Pedido</h2>
                
                <div className="space-y-3 py-3 border-y border-border">
                  <div className="flex justify-between text-sm">
                    <span>Kit Transformação {state.selectedColor}</span>
                    <span className="font-semibold">R$ {productPrice.toFixed(2)}</span>
                  </div>
                  {addUpsell && (
                    <div className="flex justify-between text-sm text-accent">
                      <span>Case Adaptada</span>
                      <span className="font-semibold">R$ {upsellPrice.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm">
                    <span>Frete</span>
                    <span className="font-semibold text-accent">
                      {shippingCost === 0 ? "GRÁTIS" : `R$ ${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between text-lg md:text-xl font-bold">
                  <span>Total</span>
                  <span className="text-accent">R$ {total.toFixed(2)}</span>
                </div>

                <Button
                  onClick={handleFinalizePurchase}
                  size="lg"
                  className="w-full text-base md:text-lg font-display font-bold py-6"
                >
                  FINALIZAR COMPRA
                </Button>

                <div className="space-y-2 text-xs text-center text-muted-foreground">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Pagamento 100% Seguro</span>
                  </div>
                  <p>Seus dados estão protegidos</p>
                </div>
              </Card>

              {/* Garantias */}
              <Card className="p-4 space-y-3 bg-secondary">
                <h3 className="font-bold text-sm">Suas Garantias:</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-primary" />
                    <span>30 dias de garantia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>Frete grátis disponível</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Devolução grátis</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Pagamento PIX */}
      <PixPaymentModal
        open={showPixModal}
        onClose={() => setShowPixModal(false)}
        amount={total}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </div>
  );
};

export default Checkout;
