import React from "react";
import { FaWhatsapp } from "react-icons/fa6";

interface WhatsAppShareButtonProps {
  protein: number;
  carbs: number;
  fats: number;
}

const WhatsAppShareButton: React.FC<WhatsAppShareButtonProps> = ({ protein, carbs, fats }) => {
  const appUrl = "https://calculadora-mtb.vercel.app/"; 
  const shareText = encodeURIComponent(
    `📊 Meus Macronutrientes:\n\n🍗 Proteína: ${Math.round(protein)}g\n🍞 Carboidratos: ${Math.round(carbs)}g\n🥑 Gorduras: ${Math.round(fats)}g\n\n📲 Calcule os seus também aqui: ${appUrl}`
  );

  const shareUrl = `https://api.whatsapp.com/send?text=${shareText}`;

  return (
    <a
  href={shareUrl}
  target="_blank"
  rel="noopener noreferrer"
  className="bg-green-500 text-white px-5 py-3 rounded-full shadow-lg flex items-center justify-center gap-3 font-bold text-lg hover:bg-green-600 transition duration-300 transform hover:scale-105"
>
  <FaWhatsapp size={28} className="animate-pulse" />  
  Compartilhe seus resultados no WhatsApp
</a>

  );
};

export default WhatsAppShareButton;
