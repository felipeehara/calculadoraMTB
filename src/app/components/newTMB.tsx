"use client"
import {useState} from 'react';

export const NewTmb = () => {

    const [inputYear, setInputValue] = useState('');
    const [inputWeight, setInputWeight] = useState('');
    const [inputHeight, setInputHeight] = useState('');
    const [inputGender, setInputGender] = useState('masculino');
    const [inputSedentary, setInputSedentary] = useState('sedentario');
    const [text, setText] = useState('');
    const [text2, setText2] = useState('');

    const handleInputChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value); 
}

  
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



      

      const calcMtb = () => {
        console.log(newValue)
        var tmbFemale:number = 447.6;
        var tmbMale:number = 88.36;
        var tmbBase = 0;
        var tmb: number;

        if (inputGender === 'feminino') {
          tmbBase = tmbFemale + (9.2 * parseInt(inputWeight)) + (3.1 * parseInt(inputHeight)) - (4.3 * parseInt(inputYear))

            console.log('é menina karaio')
            console.log(tmbFemale);
        } else {
            tmbBase = tmbMale + (13.4 * parseInt(inputWeight)) + (4.8 * parseInt(inputHeight)) - (5.7 * parseInt(inputYear))
            console.log(tmbMale);
            
            console.log('é menino sa porra')
        }
        console.log(inputSedentary)
        tmb = tmbBase

        switch (inputSedentary) {
            case 'sedentario': tmb = (tmb * 1.2)
            break;
            case 'levemente': tmb = (tmb * 1.3)
            break;
            case 'moderamente': tmb = (tmb * 1.5)
            break;
            case 'muito': tmb = (tmb * 1.7)
            break;
            case 'extremamente': tmb = (tmb * 1.9)
            break;
          }





          
          if (!inputYear || !inputWeight || !inputHeight) {
            setText(`Preencha todos os campos por favor!`);
          setText2(``);
          } else {
            setText(`Você gasta ${tmbBase.toFixed(0)} calorias sem fazer nada! `);
            setText2(`De acordo com sua atividade diaria, seus gastos calóricos são: ${tmb.toFixed(0)}!`);
          }

          
      }

      
     
      const newValue = parseInt(inputYear) + parseInt(inputWeight) + parseInt(inputHeight);


    return(
        <div className="flex justify-center h-screen w-screen bg-gradient-to-b from-gray-700 to-gray-500 items-center flex-col
        
         md:bg-gradient-to-b from-gray-600 to-gray-700">
            <div>
                <h1 className='text-xl mb-10 text-white'>Calcule sua Taxa Metabólica Basal (TMB)</h1>
            </div>
            
                <div className="flex flex-col w-52 mt-2">
                    <label className='text-white'>Idade (anos):</label>
                    <input className="text-black" type="number" inputMode="numeric" pattern="[0-9]*" value={inputYear} onChange={handleInputChangeYear}></input>
                </div>
                <div className="flex flex-col w-52 mt-2">
                    <label className='text-white'>Peso (kg):</label>
                    <input className="text-black" type="number" inputMode="numeric" pattern="[0-9]*" value={inputWeight} onChange={handleInputChangeWeight}></input>
                </div>
                <div className="flex flex-col w-52 mt-2">
                    <label className='text-white'>Altura (cm):</label>
                    <input className="text-black" type="number" inputMode="numeric" pattern="[0-9]*" value={inputHeight} onChange={handleInputChangeHeight}></input>
                </div>
            
                <div className="flex flex-col w-52 mt-2">
                    <label className='text-white'>Gênero:</label>
                    <select name="select" className="text-black" value={inputGender} onChange={handleGenderChange}>
                        <option value="masculino" selected>Masculino</option>
                        <option value="feminino" >Feminino</option>
                    </select>   
                </div>

                <div className="flex flex-col w-52 mt-2">
                    <label className='text-white'>Nível de atividade física:</label>
                    <select name="select" className="text-black" value={inputSedentary} onChange={handleSedentaryChange}>
                        <option value="sedentario" selected>Sedentario</option>
                        <option value="levemente" >Levemente ativo (1 a 2 dias por semana)</option>
                        <option value="moderamente" >Moderamente ativo (3 a 5 dias por semana)</option>
                        <option value="muito" >Muito ativo (5 a 7 vezes por semana)</option>
                        <option value="extremamente" >Extremamente ativo (2 vezes por dia)</option>
                    </select>   
                </div>
            
                <div>
                    <button className="bg-sky-600 p-2 w-52 mt-5 font-bold text-white" onClick={calcMtb}>Calcular</button>
                 </div>

                 <div>
                    <p className='mt-5 text-center text-white'>{text}</p>
                    <p className='text-center text-white'>{text2}</p>
                 </div>
        </div>
    );
} 