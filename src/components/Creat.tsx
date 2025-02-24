import React, { useState } from 'react';
import { Flame, Calendar, MapPin, Wifi, ThumbsUp, Youtube, Star, Music2, Gamepad2, Camera, Heart, Coffee, Zap, Book, Palette } from 'lucide-react';
import { supabase } from '../lib/supabase';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface RegistrationForm {
  name: string;
  email: string;
  phone: string;
  age: string;
  guardianName: string;
}

const initialForm: RegistrationForm = {
  name: '',
  email: '',
  phone: '',
  age: '',
  guardianName: '',
};

const FloatingIcon = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
  <div className={`absolute animate-float ${className}`}>
    {children}
  </div>
);

function App() {
  const [form, setForm] = useState<RegistrationForm>(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.from('registrations').insert([
        {
          name: form.name,
          email: form.email,
          phone: form.phone,
          age: parseInt(form.age),
          guardian_name: form.guardianName || null,
        },
      ]);

      if (error) throw error;

      toast.success('Inscrição realizada com sucesso!');
      setForm(initialForm);
    } catch (error) {
      toast.error('Erro ao realizar inscrição. Tente novamente.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isMinor = parseInt(form.age) < 18;

  return (
    <div className="min-h-screen bg-[#FF8A00] relative overflow-hidden">
      <Toaster position="top-right" />
      
      {/* Floating Icons */}
      <FloatingIcon className="top-20 left-[10%] text-white">
        <Wifi className="w-16 h-16" />
      </FloatingIcon>
      <FloatingIcon className="top-40 right-[15%] text-white">
        <ThumbsUp className="w-20 h-20" />
      </FloatingIcon>
      <FloatingIcon className="bottom-32 left-[20%] text-white">
        <Youtube className="w-18 h-18" />
      </FloatingIcon>
      <FloatingIcon className="top-1/4 left-[30%] text-white">
        <Star className="w-14 h-14" />
      </FloatingIcon>
      <FloatingIcon className="bottom-1/4 right-[25%] text-white">
        <Music2 className="w-16 h-16" />
      </FloatingIcon>
      <FloatingIcon className="top-1/3 right-[35%] text-white">
        <Gamepad2 className="w-18 h-18" />
      </FloatingIcon>
      <FloatingIcon className="bottom-1/3 left-[35%] text-white">
        <Camera className="w-16 h-16" />
      </FloatingIcon>
      <FloatingIcon className="top-2/3 right-[40%] text-white">
        <Heart className="w-14 h-14" />
      </FloatingIcon>
      <FloatingIcon className="bottom-2/3 left-[40%] text-white">
        <Coffee className="w-15 h-15" />
      </FloatingIcon>
      <FloatingIcon className="top-1/2 left-[15%] text-white">
        <Zap className="w-17 h-17" />
      </FloatingIcon>
      <FloatingIcon className="bottom-1/2 right-[15%] text-white">
        <Book className="w-16 h-16" />
      </FloatingIcon>
      <FloatingIcon className="top-3/4 left-[25%] text-white">
        <Palette className="w-15 h-15" />
      </FloatingIcon>

      {/* Vertical Stripes */}
      <div className="absolute inset-0 flex justify-center items-stretch pointer-events-none opacity-50">
        <div className="w-1/4 bg-[#00A99D] transform -skew-x-12" />
        <div className="w-1/4 bg-[#98C93C] transform -skew-x-12" />
        <div className="w-1/4 bg-[#F7941D] transform -skew-x-12" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Add the button to navigate to the login page */}
          <div className="absolute top-4 right-4">
            <button
              onClick={() => navigate('/login')}
              className="bg-[#F7941D] text-white py-2 px-4 rounded-md hover:bg-[#F7941D]/90 focus:outline-none focus:ring-2 focus:ring-[#F7941D] focus:ring-offset-2 transition-all duration-300"
            >
              Login
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-between items-center mb-12">
            <img 
              src="img/teen.png" 
              alt="Teen Extreme" 
              className="h-16 object-contain"
            />
            <img 
              src="img/ignite.png" 
              alt="Ignite" 
              className="h-16 object-contain"
            />
          </div>

          <div className="text-center mb-12">
            <h1 
              className="text-6xl font-bold text-white mb-6 transform hover:scale-105 transition-transform duration-300"
              style={{ 
                fontFamily: 'cursive',
                textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
              }}
            >
              Sem Distrações
            </h1>
            <div className="flex justify-center gap-6 text-white mb-8">
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full hover:bg-black/30 transition-colors duration-300">
                <Calendar className="w-5 h-5" />
                <span>01-03 de Março, 2025</span>
              </div>
              <div className="flex items-center gap-2 bg-black/20 px-4 py-2 rounded-full hover:bg-black/30 transition-colors duration-300">
                <MapPin className="w-5 h-5" />
                <span>Semeando Família</span>
              </div>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-lg shadow-xl p-12 transform hover:shadow-2xl transition-all duration-300">
            <h2 className="text-2xl font-semibold text-gray-800 mb-8 flex items-center gap-2">
              <Flame className="text-[#F7941D] animate-pulse" />
              <span className="hover:text-[#F7941D] transition-colors duration-300">
                Formulário de Inscrição
              </span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="group">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 group-hover:text-[#F7941D] transition-colors duration-300">
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={form.name}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#F7941D] focus:ring focus:ring-[#F7941D]/20 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Digite seu nome completo"
                />
              </div>

              <div className="group">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 group-hover:text-[#F7941D] transition-colors duration-300">
                  E-mail
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#F7941D] focus:ring focus:ring-[#F7941D]/20 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Digite seu e-mail"
                />
              </div>

              <div className="group">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 group-hover:text-[#F7941D] transition-colors duration-300">
                  Telefone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={form.phone}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#F7941D] focus:ring focus:ring-[#F7941D]/20 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Digite seu telefone"
                />
              </div>

              <div className="group">
                <label htmlFor="age" className="block text-sm font-medium text-gray-700 group-hover:text-[#F7941D] transition-colors duration-300">
                  Idade
                </label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  required
                  value={form.age}
                  onChange={handleChange}
                  className="mt-2 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#F7941D] focus:ring focus:ring-[#F7941D]/20 focus:ring-opacity-50 transition-all duration-300"
                  placeholder="Digite sua idade"
                />
              </div>

              {isMinor && form.age !== '' && (
                <div className="group animate-fade-in">
                  <label htmlFor="guardianName" className="block text-sm font-medium text-gray-700 group-hover:text-[#F7941D] transition-colors duration-300">
                    Nome do Responsável
                  </label>
                  <input
                    type="text"
                    id="guardianName"
                    name="guardianName"
                    required={isMinor}
                    value={form.guardianName}
                    onChange={handleChange}
                    className="mt-2 block w-full px-4 py-3 rounded-md border-gray-300 shadow-sm focus:border-[#F7941D] focus:ring focus:ring-[#F7941D]/20 focus:ring-opacity-50 transition-all duration-300"
                    placeholder="Digite o nome do responsável"
                  />
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#F7941D] text-white py-4 px-6 rounded-md hover:bg-[#F7941D]/90 focus:outline-none focus:ring-2 focus:ring-[#F7941D] focus:ring-offset-2 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 mt-8"
              >
                {loading ? 'Enviando...' : 'Realizar Inscrição'}
              </button>
            </form>
        
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;