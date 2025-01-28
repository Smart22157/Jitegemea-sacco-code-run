import { GlobeAltIcon } from '@heroicons/react/24/outline'; // Optional icon for extra styling
import { lusitana } from '@/app/ui/fonts';

export default function LogoWithText() {
  return (
    <div className={`${lusitana.className} flex items-center space-x-4`}>
      {/* Logo Image */}
      <img
       src="/hero-desktop.jpg"// Path to your logo image
        alt="Jitegemea Sacco Logo"
        className="w-15h-110" // Adjust the size of the logo
      />
      
   
     
    </div>
  );
}
