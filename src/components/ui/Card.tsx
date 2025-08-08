type CardProps = {
  children: React.ReactNode;
  className?: string;
};

const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`bg-white p-8 rounded-lg shadow-xl max-w-md w-full ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
