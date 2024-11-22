import { Mail, Phone, MapPin, Instagram, Linkedin, Youtube } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full py-8">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <a href="mailto:contacto@puer.to" className="hover:text-blue-400 transition-colors">
                contacto@puer.to
              </a>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <a href="tel:+56225701400" className="hover:text-blue-400 transition-colors">
                +56 (2) 2570 1400
              </a>
            </div>
          </div>
          <div className="hidden md:block">
            {/* Empty center column */}
          </div>
          <div className="space-y-4 flex flex-col items-center md:items-start">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 flex-shrink-0" />
              <a 
                href="https://maps.google.com/?q=Avenida+del+Valle+Norte+945,+Huechuraba,+Chile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition-colors"
              >
                Avenida del Valle Norte 945, oficina 5612, Huechuraba. CHILE.
              </a>
            </div>
            <div className="flex gap-6 pt-4 justify-center w-full">
              <a href="https://www.instagram.com/puerto_chile/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#E4405F] transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://www.linkedin.com/company/agencia-puerto/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#0A66C2] transition-colors">
                <Linkedin className="w-6 h-6" />
              </a>

              <a href="https://youtube.com/@puerto7112" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#FF0000] transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}