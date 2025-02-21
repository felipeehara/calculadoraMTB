"use client"
import { useState } from 'react';
import BarChart from '../components/BarChart';
import Modal from './ModalProteina';
import proteinFoods from "@/app/Data/proteins";
import carbFoods from "@/app/Data/carbs";
import fatFoods from "@/app/Data/fats";



export const NewTmb = () => {

  const [isProteinModalOpen, setProteinModalOpen] = useState(false);
  const [isCarbModalOpen, setCarbModalOpen] = useState(false);
  const [isFatModalOpen, setFatModalOpen] = useState(false);

  const [inputYear, setInputValue] = useState('');
  const [inputWeight, setInputWeight] = useState('');
  const [inputHeight, setInputHeight] = useState('');
  const [inputGender, setInputGender] = useState('masculino');
  const [inputSedentary, setInputSedentary] = useState('sedentario');
  const [inputObjective, setInputObjective] = useState('manter');
  const [text, setText] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');
  const [text4, setText4] = useState('');
  const [text5, setText5] = useState('');
  const [text6, setText6] = useState('');
  const [text7, setText7] = useState('');

  // Estados para os valores de proteina, gordura e carboidratos
  const [proteina, setProteina] = useState(0);
  const [gordura, setGordura] = useState(0);
  const [carboidratos, setCarboidratos] = useState(0);
  const [deficitCalorico, setDeficitCalorico] = useState(0);

  const handleInputChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleInputChangeWeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputWeight(e.target.value);
  };

  const handleInputChangeHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputHeight(e.target.value);
  };

  const handleGenderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputGender(e.target.value);
  };

  const handleSedentaryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputSedentary(e.target.value);
  };

  const handleObjectiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInputObjective(e.target.value);
  };

  const calcMtb = () => {
    let tmbBase = 0;
    let tmb: number;

    if (inputGender === 'feminino') {
      tmbBase = 447.6 + (9.2 * parseInt(inputWeight)) + (3.1 * parseInt(inputHeight)) - (4.3 * parseInt(inputYear));
    } else {
      tmbBase = 88.36 + (13.4 * parseInt(inputWeight)) + (4.8 * parseInt(inputHeight)) - (5.7 * parseInt(inputYear));
    }

    tmb = tmbBase;

    switch (inputSedentary) {
      case 'sedentario': tmb *= 1.2; break;
      case 'levemente': tmb *= 1.3; break;
      case 'moderamente': tmb *= 1.5; break;
      case 'muito': tmb *= 1.7; break;
      case 'extremamente': tmb *= 1.9; break;
    }

    let proteina = parseInt(inputWeight) * 2;
    let gordura = parseInt(inputWeight);
    let carboidratos: number = 0;
    let deficitCalorico: number = 0;

    const caloriaProteina = proteina * 4;
    const caloriaGordura = gordura * 9;
    const somaDeTudo = caloriaProteina + caloriaGordura;

    switch (inputObjective) {
      case 'emagrecimento':
        deficitCalorico = tmb * 0.85;
        carboidratos = (deficitCalorico - somaDeTudo) / 4;
        break;
      case 'manter':
        carboidratos = (tmb - somaDeTudo) / 4;
        break;
      case 'ganho':
        deficitCalorico = tmb / 0.85;
        proteina = parseInt(inputWeight) * 1.8;
        carboidratos = (deficitCalorico - somaDeTudo) / 4;
        break;
    }

    if (!inputYear || !inputWeight || !inputHeight) {
      setText(`Preencha todos os campos por favor!`);
      setText2('');
    } else {
      setText(`Gasto calórico em repouso: ${tmbBase.toFixed(0)} Kcal`);
      setText2(`Gasto calórico diário com atividades: ${tmb.toFixed(0)} Kcal`);
      setText3(`Proteina: ${proteina}g`);
      setText5(`Gordura: ${gordura}g`);
      setText4(`Carboidratos: ${carboidratos.toFixed(0)}g`);
      if (inputObjective === "emagrecimento") {
        setText6(`DEFICIT CALÓRICO: ${deficitCalorico.toFixed(0)}Kcal`);
      } else if (inputObjective === "ganho") {
        setText6(`Superávit Calórico: ${deficitCalorico.toFixed(0)}Kcal`);
      } else {
        setText6(`Manter Peso: ${tmb.toFixed(0)} Kcal`);
      }
      setText7(`De acordo com o seu objetivo, aqui está a sugestão de como sua alimentação diária pode ser ajustada para melhores resultados:`);
    }

    // Atualizando os estados
    setProteina(proteina);
    setGordura(gordura);
    setCarboidratos(carboidratos);
    setDeficitCalorico(deficitCalorico);
  };


  
// 
  return (
    <div className="flex justify-center h-full w-screen bg-gradient-to-b from-gray-700 to-gray-500 items-center flex-col md:bg-gradient-to-b from-gray-600 to-gray-700">
      <div>
        <h1 className="text-xl mb-10 text-white"></h1>
      </div>
      
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl shadow-2xl max-w-md mx-auto">
  <h2 className="text-2xl font-bold text-center text-white mb-6">Calculadora de TMB</h2>

  <div className="flex flex-col mb-4">
    <label className="text-white font-semibold mb-2">Idade (anos):</label>
    <input
      className="p-3 rounded-lg border-none outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500"
      type="number"
      placeholder="Digite sua idade"
      value={inputYear}
      onChange={handleInputChangeYear}
    />
  </div>

  <div className="flex flex-col mb-4">
    <label className="text-white font-semibold mb-2">Peso (kg):</label>
    <input
      className="p-3 rounded-lg border-none outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500"
      type="number"
      placeholder="Digite seu peso"
      value={inputWeight}
      onChange={handleInputChangeWeight}
    />
  </div>

  <div className="flex flex-col mb-4">
    <label className="text-white font-semibold mb-2">Altura (cm):</label>
    <input
      className="p-3 rounded-lg border-none outline-none bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-sky-500"
      type="number"
      placeholder="Digite sua altura"
      value={inputHeight}
      onChange={handleInputChangeHeight}
    />
  </div>

  <div className="flex flex-col mb-4">
    <label className="text-white font-semibold mb-2">Gênero:</label>
    <select
      className="p-3 rounded-lg border-none bg-gray-700 text-white focus:ring-2 focus:ring-sky-500"
      value={inputGender}
      onChange={handleGenderChange}
    >
      <option value="masculino">Masculino</option>
      <option value="feminino">Feminino</option>
    </select>
  </div>

  <div className="flex flex-col mb-4">
    <label className="text-white font-semibold mb-2">Nível de atividade física:</label>
    <select
      className="p-3 rounded-lg border-none bg-gray-700 text-white focus:ring-2 focus:ring-sky-500"
      value={inputSedentary}
      onChange={handleSedentaryChange}
    >
      <option value="sedentario">Sedentário</option>
      <option value="levemente">Levemente ativo (1 a 2 dias por semana)</option>
      <option value="moderamente">Moderadamente ativo (3 a 5 dias por semana)</option>
      <option value="muito">Muito ativo (5 a 7 vezes por semana)</option>
      <option value="extremamente">Extremamente ativo (2 vezes por dia)</option>
    </select>
  </div>

  <div className="flex flex-col mb-6">
    <label className="text-white font-semibold mb-2">Qual o seu objetivo?</label>
    <select
      className="p-3 rounded-lg border-none bg-gray-700 text-white focus:ring-2 focus:ring-sky-500"
      value={inputObjective}
      onChange={handleObjectiveChange}
    >
      <option value="emagrecimento">Emagrecimento</option>
      <option value="ganho">Ganho de massa</option>
      <option value="manter">Manter o meu peso</option>
    </select>
  </div>

    <button
    className="w-full p-3 rounded-lg bg-sky-500 text-white font-bold hover:bg-sky-600 transition-all duration-300"
    onClick={calcMtb}
  >
    Calcular
  </button>
</div>
       
      
      <div className="mt-5 space-y-6 text-center text-white">
  <h2 className="text-2xl font-bold">Seu Resultado Diário:</h2>
  

  {text && (
    <p className="text-lg font-semibold bg-gray-600 p-4 rounded-2xl shadow-md">
      {text}
    </p>
  )}
  {text2 && (
    <p className="text-lg font-semibold bg-gray-600 p-4 rounded-2xl shadow-md">
      {text2}
    </p>
  )}
  {text7 && (
    <p className="text-lg font-semibold bg-gray-600 p-4 rounded-2xl shadow-md">
      {text7}
    </p>
  )}
  {/* Exibir os macronutrientes em cartões separados */}
  <div className="flex flex-col items-center space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-center">
    {text3 && (
      <div className="bg-blue-500 rounded-2xl p-4 w-64 text-white font-bold shadow-md">
        {text3}
      </div>
    )}
    {text4 && (
      <div className="bg-red-500 rounded-2xl p-4 w-64 text-white font-bold shadow-md">
        {text4}
      </div>
    )}
    {text5 && (
      <div className="bg-yellow-400 rounded-2xl p-4 w-64 text-black font-bold shadow-md">
        {text5}
      </div>
    )}

    
   
  </div>

  {text6 && (
    <div className="mt-5 bg-green-500 rounded-2xl p-4 text-white font-bold shadow-md">
      {text6}
    </div>
  )}
</div>
      <div className='h-72 w-96'>
        <BarChart proteina={proteina} carboidratos={carboidratos} gordura={gordura} />
      </div>

      {text6 && (
    <div className="text-lg font-semibold bg-gray-600 p-4 rounded-2xl shadow-md text-white">
      <p>Alimentos que vão te ajudar a alcançar suas metas diárias:</p>
    </div>
  )}

      {text6 && (
  <div className="p-4 flex gap-8">
    {/* Exibir alimentos ricos em proteínas */}
    <div>
      <button
        onClick={() => setProteinModalOpen(true)}
        className="px-4 py-2 bg-blue-500 text-white rounded-md"
      >
        Ver Proteínas
      </button>
      <Modal isOpen={isProteinModalOpen} onClose={() => setProteinModalOpen(false)}>
        <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
          Alimentos Ricos em Proteínas
        </h2>
        <ul className="space-y-2">
          {proteinFoods.map((food, index) => (
            <li key={index} className="flex justify-between bg-gray-100 p-2 rounded-md shadow-sm">
              <span className="text-gray-700 font-medium">{food.name}</span>
              <span className="text-blue-600 font-semibold">{food.value} {food.unit}</span>
            </li>
          ))}
        </ul>
      </Modal>
    </div>
     {/* Exibir alimentos ricos em carboidratos */}
     <div>
       <button
         onClick={() => setCarbModalOpen(true)}
         className="px-4 py-2 bg-red-500 text-white rounded-md"
       >
         Ver Carboidratos
       </button>

       <Modal isOpen={isCarbModalOpen} onClose={() => setCarbModalOpen(false)}>
         <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
           Alimentos Ricos em Carboidratos
         </h2>
         <ul className="space-y-2">
           {carbFoods.map((food, index) => (
             <li key={index} className="flex justify-between bg-gray-100 p-2 rounded-md shadow-sm">
               <span className="text-gray-700 font-medium">{food.name}</span>
               <span className="text-blue-600 font-semibold">
                 {food.value} {food.unit}
               </span>
             </li>
           ))}
         </ul>
       </Modal>
     </div>
        {/* Exibir alimentos ricos em gorduras */}
        <div>
       <button
         onClick={() => setFatModalOpen(true)}
         className="px-4 py-2 bg-yellow-500 text-white rounded-md"
       >
         Ver Gorduras
       </button>

       <Modal isOpen={isFatModalOpen} onClose={() => setFatModalOpen(false)}>
         <h2 className="text-xl font-bold text-center mb-4 text-gray-800">
           Alimentos Ricos em Gorduras
         </h2>
         <ul className="space-y-2">
           {fatFoods.map((food, index) => (
             <li key={index} className="flex justify-between bg-gray-100 p-2 rounded-md shadow-sm">
               <span className="text-gray-700 font-medium">{food.name}</span>
               <span className="text-blue-600 font-semibold">
                 {food.value} {food.unit}
               </span>
             </li>
           ))}
         </ul>
       </Modal>
     </div>
  </div>
)}


     
  

    </div>
  );
}
