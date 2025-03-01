// src/app/page.tsx
import styles from './page.module.css';
import Link from 'next/link';
import { AiFillHome, AiFillDollarCircle, AiFillBank, AiFillFileText } from 'react-icons/ai'; // Importa los iconos
import { MdApartment } from 'react-icons/md';

const HomePage = () => {
  const CategoryIcon = ({ icon }: { icon: React.ComponentType<any> }) => {
    const TheIcon = icon;
    return <TheIcon className="h-8 w-8 text-white" />;
  };

  const categories = [
    { name: 'Inicio', icon: AiFillHome, path: '/' },
    { name: 'Clientes', icon: MdApartment, path: '/clientes' },
    { name: 'Pagos', icon: AiFillDollarCircle, path: '/pagos' },
    // ...otros categorías
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
      <h1 className="text-4xl font-bold text-blue-500">Categorías</h1>
        <div className="grid grid-cols-2 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.path}
              className="flex flex-col items-center p-4 rounded-lg shadow-md bg-blue-500 text-white"
            >
              <CategoryIcon icon={category.icon} />
              <span className="mt-2">{category.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;