import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Tipos das propriedades esperadas
type BarChartProps = {
  proteina: number;
  carboidratos: number;
  gordura: number;
};

const BarChart = ({ proteina, carboidratos, gordura }: BarChartProps) => {
    // Dados do gráfico
    const data = {
      labels: ['Proteínas', 'Carboidratos', 'Gorduras'],
      datasets: [
        {
          label: 'Macronutrientes',
          data: [proteina, carboidratos, gordura],
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)', // Cor para Proteínas (vermelho)
            'rgba(255, 99, 132, 0.7)', // Cor para Carboidratos (azul)
            'rgba(255, 206, 86, 0.7)', // Cor para Gorduras (amarelo)
             
          ],
          borderColor: [
            'rgba(54, 162, 235, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(255, 206, 86, 1)',
            
          ],
          borderWidth: 2,
        },
      ],
    };
  
    // Opções de configuração do gráfico
    const options = {
      responsive: true,
      plugins: {
        title: {
          display: true,
          text: 'Macronutrientes para Manter Peso',
        },
      },
    };
  
    return <Bar data={data} options={options} />;
  };
export default BarChart;
