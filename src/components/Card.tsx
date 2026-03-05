// components/AtomCard.tsx
import Image from 'next/image';

interface AtomCardProps {
  title: string;
  imageSrc: string; // path relative to /public
  imageAlt?: string; // optional alt text
  buttonText?: string;
  onClick?: () => void;
}

const AtomCard: React.FC<AtomCardProps> = ({
  title,
  imageSrc,
  imageAlt = '',
  buttonText = 'Click',
  onClick,
}) => {
  return (
    <div className="atom-card shadow-lg rounded-xl p-8 w-full max-w-md flex flex-col gap-6">
      <ul>
        <li className="text-xl font-bold">{title}</li>
        <li>
          <Image
            src={imageSrc}
            alt={imageAlt || title}
            width={400}
            height={200}
            className="rounded-lg w-full object-cover"
          />
        </li>
      </ul>
      <button
        type="button"
        onClick={onClick}
        className="btn-atom hover:btn-atom"
      >
        {buttonText}
      </button>
    </div>
  );
};

export default AtomCard;