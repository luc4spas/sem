import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Flame } from 'lucide-react';
import toast from 'react-hot-toast';

export function RegistrationPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    age: '',
    church: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('registrations')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            age: parseInt(formData.age),
            church: formData.church,
            status: 'pending'
          }
        ]);

      if (error) throw error;

      toast.success('Registro realizado com sucesso!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        age: '',
        church: ''
      });
    } catch (error) {
      toast.error('Erro ao realizar registro. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FF8A00] flex items-center justify-center px-4">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-xl">
        <div className="text-center">
          <Flame className="mx-auto h-12 w-12 text-[#F7941D]" />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Conferência Sem Distrações
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Preencha o formulário para se inscrever
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nome Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F7941D] focus:border-[#F7941D]"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F7941D] focus:border-[#F7941D]"
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Telefone
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F7941D] focus:border-[#F7941D]"
              />
            </div>

            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700">
                Idade
              </label>
              <input
                id="age"
                name="age"
                type="number"
                required
                value={formData.age}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F7941D] focus:border-[#F7941D]"
              />
            </div>

            <div>
              <label htmlFor="church" className="block text-sm font-medium text-gray-700">
                Igreja
              </label>
              <input
                id="church"
                name="church"
                type="text"
                required
                value={formData.church}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#F7941D] focus:border-[#F7941D]"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#F7941D] hover:bg-[#F7941D]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F7941D] disabled:opacity-50"
            >
              {loading ? 'Registrando...' : 'Registrar'}
            </button>
          </div>
        </form>

        <div className="text-center">
          <button
            onClick={() => navigate('/login')}
            className="text-[#F7941D] hover:text-[#F7941D]/90 font-medium"
          >
            Área Administrativa
          </button>
        </div>
      </div>
    </div>
  );
}