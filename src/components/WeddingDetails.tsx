import {
  FaCalendarAlt,
  FaClock,
  FaChurch,
  FaMapMarkerAlt,
  FaBell,
  FaTshirt,
} from 'react-icons/fa';
import { useState } from 'react';
import { GiRose } from 'react-icons/gi';

const WeddingDetails = () => {
  const [mapError, setMapError] = useState(false);
  const title = "Daniel & Stella's Wedding";
  const description =
    'Join us for the beautiful wedding ceremony of Daniel Otieno Okumu and Stella Amoit.';
  const location = 'St. Leonida Catholic Church, Nyawita, Kisumu';
  const startDate = '2025-08-09T09:00:00';
  const endDate = '2025-08-09T11:00:00';

  const [reminderSet, setReminderSet] = useState(false);

  const googleCalendarURL = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    title
  )}&dates=${startDate.replace(/[-:]/g, '')}/${endDate.replace(/[-:]/g, '')}&details=${encodeURIComponent(
    description
  )}&location=${encodeURIComponent(location)}&sf=true&output=xml`;

  const handleSetReminder = () => {
    const weddingTime = new Date(startDate).getTime();
    const now = Date.now();
    const oneHourBefore = weddingTime - 60 * 60 * 1000;

    const delay = oneHourBefore - now;

    if (delay <= 0) {
      alert("The reminder time has already passed.");
      return;
    }

    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        setReminderSet(true);
        setTimeout(() => {
          new Notification('⏰ Wedding Reminder', {
            body: `Daniel & Stella's wedding is in 1 hour at ${location}`,
            icon: '/assets/rings.png',
          });
        }, delay);
        alert("Reminder set! You'll be notified 1 hour before the wedding.");
      } else {
        alert('Notifications are blocked. Please enable them in your browser.');
      }
    });
  };

  return (
    <section id="details" className="py-16 md:py-24 bg-white relative z-10">
      <div className="container mx-auto px-4">
        <h2 className="heading-font text-4xl md:text-5xl text-center mb-12 text-navy-800 page">
          Wedding Details
        </h2>


              {/* Decorative elements */}
              <div className="absolute top-10 left-10 opacity-20 rotate-12">
                <GiRose className="text-rose-300 text-6xl" />
              </div>
              <div className="absolute bottom-10 right-10 opacity-20 -rotate-12">
                <GiRose className="text-lavender-300 text-8xl" />
              </div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10"></div>
        

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {/* Date Card */}
          <div className="bg-orange-50 p-8 rounded-2xl shadow-lg text-center card-3d page transition-transform duration-300 hover:scale-105">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6 pulse">
              <FaCalendarAlt className="text-3xl text-orange-700" />
            </div>
            <h3 className="heading-font text-2xl mb-3 text-orange-800">Date</h3>
            <p className="text-orange-700 text-lg">August 9, 2025</p>

            <div className="flex justify-center mt-4">
              <a
                href={googleCalendarURL}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-100 text-red-800 rounded-full text-sm hover:bg-red-200 transition-colors flex items-center justify-center"
              >
                <FaCalendarAlt className="mr-2" /> Add to Google Calendar
              </a>
            </div>

            <div className="mt-6 rounded-xl overflow-hidden shadow-md">
              <img
                src="/assets/images/wedding-date.png"
                alt="Wedding Date"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>

          {/* Time Card */}
          <div className="bg-gold-50 p-8 rounded-2xl shadow-lg text-center card-3d page transition-transform duration-300 hover:scale-105">
            <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center mx-auto mb-6 pulse">
              <FaClock className="text-3xl text-gold-700" />
            </div>
            <h3 className="heading-font text-2xl mb-3 text-gold-800">Time</h3>
            <p className="text-gold-700 text-lg">9:00 AM</p>
            <div className="mt-4">
              <button
                onClick={handleSetReminder}
                disabled={reminderSet}
                className={`inline-flex items-center px-4 py-2 ${
                  reminderSet
                    ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                    : 'bg-gold-100 text-gold-800 hover:bg-gold-200'
                } rounded-full text-sm transition-colors`}
              >
                <FaBell className="mr-2" />
                {reminderSet ? 'Reminder Set' : 'Set Reminder'}
              </button>
            </div>
            <div className="mt-6 rounded-xl overflow-hidden shadow-md">
              <img
                src="/assets/images/wedding-time.jpg"
                alt="Wedding Time"
                className="w-full h-40 object-cover"
              />
            </div>
          </div>

          {/* Location Card */}
        <div className="bg-navy-50 p-8 rounded-2xl shadow-lg text-center card-3d page transition-transform duration-300 hover:scale-105">
          <div className="w-20 h-20 bg-navy-100 rounded-full flex items-center justify-center mx-auto mb-6 pulse">
            <FaChurch className="text-3xl text-navy-700" />
          </div>
          <h3 className="heading-font text-2xl mb-3 text-navy-800">Location</h3>
          <p className="text-navy-700 text-lg mb-2">St. Leonida Catholic Church</p>
          <p className="text-navy-600 text-sm mb-4">Nyawita, Kisumu</p>

          <div className="relative h-40 bg-gray-200 rounded-lg overflow-hidden mb-4">
            {mapError ? (
              <img
                src="/assets/images/map-fallback.jpg"
                alt="Fallback Map"
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                title="Wedding Location"
                src="https://www.google.com/maps?q=St.+Leonida+Catholic+Church,+Kisumu&output=embed"
                className="w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                onError={() => setMapError(true)}
              ></iframe>
            )}
          </div>

          <a
            href="https://www.google.com/maps/search/?api=1&query=St.+Leonida+Catholic+Church,+Kisumu"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-6 py-2 bg-navy-600 text-white rounded-full hover:bg-navy-700 transition-colors duration-300"
          >
            <FaMapMarkerAlt className="mr-2" /> View on Map
          </a>
        </div>
        </div>

        {/* Enhanced Dress Code Card */}
        <div className="mt-12 md:mt-16 max-w-6xl mx-auto px-4">
          <div className="bg-gradient-to-br from-amber-50 to-rose-50 p-6 md:p-8 rounded-3xl shadow-xl text-center card-3d page transition-all duration-300 hover:scale-105 border-2 border-amber-100 overflow-hidden relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-amber-200 opacity-20"></div>
            <div className="absolute -bottom-5 -left-5 w-24 h-24 rounded-full bg-rose-200 opacity-20"></div>
            
            <div className="relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-amber-100 to-rose-100 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6 pulse shadow-md">
                  <FaTshirt className="text-3xl text-navy-700" />
                </div>
                
                <h3 className="heading-font text-2xl md:text-3xl mb-2 md:mb-4 text-transparent bg-gradient-to-r from-amber-800 to-rose-700 bg-clip-text">
                  Dress Code
                </h3>
                
                <p className="text-amber-800 text-sm md:text-base mb-6 font-medium max-w-md mx-auto">
                  Celebrate in harmony with our wedding colour palette
                </p>
              </div>
              
              {/* Color Palette Preview - Mobile */}
              <div className="md:hidden flex justify-center gap-2 mb-6">
                <div className="w-10 h-10 rounded-md bg-navy-700 shadow-md flex items-center justify-center text-white text-xs">Navy</div>
                <div className="w-10 h-10 rounded-md bg-amber-600 shadow-md flex items-center justify-center text-white text-xs">Orange</div>
                <div className="w-10 h-10 rounded-md bg-amber-200 shadow-md flex items-center justify-center text-amber-800 text-xs">Gold</div>
                <div className="w-10 h-10 rounded-md bg-rose-50 shadow-md flex items-center justify-center text-rose-800 text-xs">Cream</div>
              </div>
              
              {/* Color Palette Preview - Desktop */}
              <div className="hidden md:flex justify-center gap-3 mb-8">
                <div className="w-16 h-16 rounded-lg bg-navy-700 shadow-md flex flex-col items-center justify-center text-white">
                  <span className="text-xs">Royal</span>
                  <span className="font-medium">Navy</span>
                </div>
                <div className="w-16 h-16 rounded-lg bg-amber-600 shadow-md flex flex-col items-center justify-center text-white">
                  <span className="text-xs">Burnt</span>
                  <span className="font-medium">Orange</span>
                </div>
                <div className="w-16 h-16 rounded-lg bg-amber-200 shadow-md flex flex-col items-center justify-center text-amber-800">
                  <span className="text-xs">Warm</span>
                  <span className="font-medium">Gold</span>
                </div>
                <div className="w-16 h-16 rounded-lg bg-rose-50 shadow-md flex flex-col items-center justify-center text-rose-800 border border-rose-200">
                  <span className="text-xs">Soft</span>
                  <span className="font-medium">Cream</span>
                </div>
              </div>
              
              {/* Dress Code Details */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
                {/* Gentlemen */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-100 hover:shadow-md transition-shadow">
                  <div className="text-navy-700 text-2xl mb-2">🎩</div>
                  <h4 className="heading-font text-navy-800 mb-2">Gentlemen</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Royal Navy suits with <span className="font-medium text-amber-600">burnt orange</span> ties or pocket squares. Formal attire preferred.
                  </p>
                </div>
                
                {/* Ladies */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-rose-100 hover:shadow-md transition-shadow">
                  <div className="text-rose-600 text-2xl mb-2">👗</div>
                  <h4 className="heading-font text-navy-800 mb-2">Ladies</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Elegant <span className="font-medium text-amber-600">burnt orange</span> or <span className="font-medium text-amber-400">gold</span> dresses. Cocktail or formal length.
                  </p>
                </div>
                
                {/* Guests */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-amber-50 hover:shadow-md transition-shadow">
                  <div className="text-amber-600 text-2xl mb-2">✨</div>
                  <h4 className="heading-font text-navy-800 mb-2">Guests</h4>
                  <p className="text-sm text-amber-800 leading-relaxed">
                    Navy blue, burnt orange, gold, or cream tones. Avoid white or black.
                  </p>
                </div>
              </div>
              
              {/* Example Image */}
              <div className="mt-4 rounded-xl overflow-hidden shadow-md border border-amber-100 transition-all hover:shadow-lg">
                <img
                  src="/assets/images/wedding-dress-code.jpg"
                  alt="Wedding Dress Code Examples"
                  className="w-full h-48 md:h-56 object-cover"
                />
                <div className="bg-white p-3 text-xs text-amber-800 text-center">
                  Colour inspiration for the outfit
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WeddingDetails;