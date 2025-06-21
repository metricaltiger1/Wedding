import { useState, useEffect, useRef } from 'react';
import { FaHeart, FaPaperPlane, FaUser, FaChevronDown, 
         FaPlus, FaMinus, FaEdit, FaCheck, FaGlassCheers, 
         FaSadTear, FaTimes, FaExclamationTriangle } from 'react-icons/fa';
import Confetti from './Confetti';
import { GiRose } from 'react-icons/gi';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

const RSVPSection = () => {
  // State management
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReviewing, setIsReviewing] = useState(false);
  const [guestCount, setGuestCount] = useState(1);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Ref for error scrolling
  const errorRef = useRef<HTMLDivElement>(null);

  // Form data state
  const [formData, setFormData] = useState({
    name: '',
    attending: 'yes' as 'yes' | 'no',
    message: '',
  });

  // Scroll to error when it occurs
  useEffect(() => {
    if (error && errorRef.current) {
      errorRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }, [error]);

  // Submit to Firestore with enhanced error handling
  const submitRSVP = async () => {
    setIsSending(true);
    setError(null);
    
    // Check online status
    if (!navigator.onLine) {
      setError("You appear to be offline. Please check your connection.");
      setIsSending(false);
      return;
    }

    try {
      // Validate data before sending
      if (!formData.name.trim()) {
        throw new Error("Please enter your name");
      }

      // Create the document in Firestore
      const docRef = await addDoc(collection(db, "dan-stella-wedding/2025/rsvps"), {
        name: formData.name.trim(),
        attending: formData.attending,
        guestCount: formData.attending === 'yes' ? guestCount : 0,
        message: formData.message.trim(),
        timestamp: serverTimestamp(),
        status: formData.attending === 'yes' ? 'confirmed' : 'declined'
      });
      
      console.log("RSVP submitted with ID:", docRef.id);
      
      // On success
      setIsSubmitted(true);
      if (formData.attending === 'yes') {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
      }
    } catch (err) {
      console.error("Detailed submission error:", err);
      
      let errorMessage = "Failed to submit your RSVP";
      if (typeof err === 'object' && err !== null) {
        const errorObj = err as { code?: string; message?: string };
        if (errorObj.code === 'permission-denied') {
          errorMessage = "Permission denied. Please contact support.";
        } else if (errorObj.code === 'unavailable') {
          errorMessage = "Network error. Please check your connection.";
        } else if (errorObj.message) {
          errorMessage = errorObj.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsSending(false);
    }
  };

  // Handlers
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (operation: 'increase' | 'decrease') => {
    setGuestCount(prev => {
      if (operation === 'increase') return Math.min(10, prev + 1);
      return Math.max(1, prev - 1);
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      setIsReviewing(true);
    }
  };

  const handleEdit = () => {
    setIsReviewing(false);
    setError(null);
  };

  const handleCancelRSVP = () => setShowCancelModal(true);

  const confirmCancel = () => {
    setIsOpen(false);
    setIsReviewing(false);
    setIsSubmitted(false);
    setShowCancelModal(false);
    setFormData({
      name: '',
      attending: 'yes',
      message: '',
    });
    setGuestCount(1);
    setError(null);
  };

  return (
    <section className="relative py-12 md:py-20 bg-navy-900 text-white">
      {showConfetti && <Confetti />}

      {/* Decorative elements */}
      <div className="absolute top-10 left-10 opacity-20 rotate-12 z-0">
        <GiRose className="text-rose-300 text-6xl" />
      </div>
      <div className="absolute bottom-10 right-10 opacity-20 -rotate-12 z-0">
        <GiRose className="text-lavender-300 text-8xl" />
      </div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-10 z-0"></div>
      
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-light text-gold-400 mb-3 md:mb-4">
            Will You Join Us?
          </h2>
          <div className="w-16 h-px bg-gold-500 mx-auto mb-4 md:mb-6 opacity-60"></div>
          <p className="text-base md:text-lg text-white max-w-lg mx-auto opacity-90">
            Kindly respond by July 30th to let us know if you'll be celebrating with us
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div 
            ref={errorRef}
            className="max-w-md mx-auto mb-6 p-4 bg-red-100 border-l-4 border-red-500 text-red-700 rounded scroll-mt-20 flex items-start animate-pulse-once"
          >
            <FaExclamationTriangle className="mr-2 mt-0.5 flex-shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Main RSVP Flow */}
        {!isOpen && !isSubmitted && (
          <div className="flex justify-center">
            <button
              onClick={() => setIsOpen(true)}
              className="relative px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group overflow-hidden"
            >
              <span className="relative z-10 flex items-center text-lg md:text-xl font-serif tracking-wider">
                <FaHeart className="mr-2 md:mr-3 animate-pulse text-gold-300" />
                RSVP Now
                <FaChevronDown className="ml-2 md:ml-3 transition-transform duration-300 group-hover:translate-y-1" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </button>
          </div>
        )}

        {/* Form Section */}
        {isOpen && !isSubmitted && (
          <div className="max-w-md mx-auto">
            <div className={`bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 ${isReviewing ? 'max-h-[700px]' : 'max-h-[900px]'}`}>
              
              {/* Form Header */}
              <div className="h-12 bg-gradient-to-r from-navy-700 to-navy-800 relative flex items-center justify-center">
                <button 
                  onClick={handleCancelRSVP}
                  className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white text-sm flex items-center hover:text-gold-300 transition-colors px-3 py-1 rounded-md hover:bg-white hover:bg-opacity-10 z-10"
                >
                  <FaTimes className="mr-1" /> Close RSVP
                </button>
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-2 bg-gold-500 rounded-t-full"></div>
              </div>

              {!isReviewing ? (
                // FORM VIEW
                <form onSubmit={handleSubmit} className="p-6 md:p-8">
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-serif text-navy-900 mb-4 md:mb-6 text-center">
                      We Can't Wait to Celebrate With You
                    </h3>
                    <div className="w-12 h-px bg-gold-500 mx-auto mb-6 md:mb-8 opacity-60"></div>
                  </div>

                  <div className="space-y-4 md:space-y-6">
                    {/* Name Field */}
                    <div className="relative">
                      <label htmlFor="name" className="block text-sm font-medium text-navy-700 mb-1 ml-1">
                        Your Name
                      </label>
                      <div className="relative">
                        <input
                          id="name"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 md:px-5 md:py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent placeholder-navy-300 transition-all duration-300 text-sm md:text-base text-navy-900"
                          placeholder="Enter your full name"
                        />
                        <FaUser className="absolute right-3 top-1/2 transform -translate-y-1/2 text-navy-300 text-sm md:text-base" />
                      </div>
                    </div>

                    {/* Attendance Selection */}
                    <div>
                      <legend className="block text-sm font-medium text-navy-700 mb-2 ml-1">
                        Will you be attending?
                      </legend>
                      <div className="grid grid-cols-2 gap-3 md:gap-4">
                        <label className={`relative cursor-pointer transition-all duration-300 ${formData.attending === 'yes' ? 'ring-2 ring-gold-400' : 'hover:ring-1 hover:ring-navy-200'}`}>
                          <input
                            type="radio"
                            name="attending"
                            value="yes"
                            checked={formData.attending === 'yes'}
                            onChange={handleChange}
                            className="absolute opacity-0"
                          />
                          <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-navy-50 to-white flex items-center justify-center h-full">
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center mr-2 md:mr-3 transition-all ${formData.attending === 'yes' ? 'border-gold-500 bg-gold-500' : 'border-navy-300'}`}>
                              {formData.attending === 'yes' && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"></div>}
                            </div>
                            <span className="font-medium text-navy-800 text-sm md:text-base">Yes, with joy!</span>
                          </div>
                        </label>
                        <label className={`relative cursor-pointer transition-all duration-300 ${formData.attending === 'no' ? 'ring-2 ring-gold-400' : 'hover:ring-1 hover:ring-navy-200'}`}>
                          <input
                            type="radio"
                            name="attending"
                            value="no"
                            checked={formData.attending === 'no'}
                            onChange={handleChange}
                            className="absolute opacity-0"
                          />
                          <div className="p-3 md:p-4 rounded-lg bg-gradient-to-br from-navy-50 to-white flex items-center justify-center h-full">
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded-full border-2 flex items-center justify-center mr-2 md:mr-3 transition-all ${formData.attending === 'no' ? 'border-gold-500 bg-gold-500' : 'border-navy-300'}`}>
                              {formData.attending === 'no' && <div className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-white"></div>}
                            </div>
                            <span className="font-medium text-navy-800 text-sm md:text-base">Regretfully no</span>
                          </div>
                        </label>
                      </div>
                    </div>

                    {/* Guest Count (only shows if attending) */}
                    {formData.attending === 'yes' && (
                      <div>
                        <label className="block text-sm font-medium text-navy-700 mb-1 ml-1">
                          Number of Guests
                        </label>
                        <div className="flex items-center justify-between bg-navy-50 rounded-lg p-1 md:p-2">
                          <button
                            type="button"
                            onClick={() => handleGuestChange('decrease')}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${guestCount === 1 ? 'text-navy-200 cursor-not-allowed' : 'text-navy-600 hover:bg-navy-100'}`}
                            disabled={guestCount === 1}
                          >
                            <FaMinus className="text-xs md:text-sm" />
                          </button>
                          <span className="text-lg md:text-xl font-medium text-navy-800 px-2 md:px-4">{guestCount}</span>
                          <button
                            type="button"
                            onClick={() => handleGuestChange('increase')}
                            className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center transition-all ${guestCount === 10 ? 'text-navy-200 cursor-not-allowed' : 'text-navy-600 hover:bg-navy-100'}`}
                            disabled={guestCount === 10}
                          >
                            <FaPlus className="text-xs md:text-sm" />
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Message Field */}
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-navy-700 mb-1 ml-1">
                        Personal Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 md:px-5 md:py-3 border border-navy-200 rounded-lg focus:ring-2 focus:ring-gold-400 focus:border-transparent placeholder-navy-300 transition-all duration-300 text-sm md:text-base text-navy-900"
                        placeholder="Share your well wishes or any special notes"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={!formData.name}
                      className={`w-full py-3 md:py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl mt-4 md:mt-6 flex items-center justify-center ${!formData.name ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <span>Review Your Response</span>
                      <FaPaperPlane className="ml-2 md:ml-3 animate-bounce text-xs md:text-sm" />
                    </button>
                  </div>
                </form>
              ) : (
                // REVIEW VIEW
                <div className="p-6 md:p-8">
                  <div className="mb-6 md:mb-8">
                    <h3 className="text-xl md:text-2xl font-serif text-navy-900 mb-4 md:mb-6 text-center">
                      Review Your Response
                    </h3>
                    <div className="w-12 h-px bg-gold-500 mx-auto mb-6 md:mb-8 opacity-60"></div>
                  </div>

                  <div className="bg-navy-50 rounded-xl p-4 md:p-6 mb-6 md:mb-8 space-y-3 md:space-y-4">
                    <div className="flex justify-between border-b border-navy-100 pb-2 md:pb-3">
                      <span className="text-navy-700 text-sm md:text-base">Name:</span>
                      <span className="text-navy-900 font-medium text-sm md:text-base">{formData.name}</span>
                    </div>
                    <div className="flex justify-between border-b border-navy-100 pb-2 md:pb-3">
                      <span className="text-navy-700 text-sm md:text-base">Attending:</span>
                      <span className="text-navy-900 font-medium text-sm md:text-base">
                        {formData.attending === 'yes' ? (
                          <span className="text-green-600">Yes, with joy!</span>
                        ) : (
                          <span className="text-orange-600">Regretfully no</span>
                        )}
                      </span>
                    </div>
                    {formData.attending === 'yes' && (
                      <div className="flex justify-between border-b border-navy-100 pb-2 md:pb-3">
                        <span className="text-navy-700 text-sm md:text-base">Number of Guests:</span>
                        <span className="text-navy-900 font-medium text-sm md:text-base">{guestCount}</span>
                      </div>
                    )}
                    {formData.message && (
                      <div className="pt-2 md:pt-3">
                        <p className="text-xs md:text-sm text-navy-700 mb-1">Your Message:</p>
                        <p className="text-navy-900 italic text-sm md:text-base">"{formData.message}"</p>
                      </div>
                    )}
                  </div>

                  <div className="flex space-x-3 md:space-x-4">
                    <button
                      onClick={handleEdit}
                      className="flex-1 py-2 md:py-3 bg-white border border-navy-300 text-navy-700 rounded-lg font-medium hover:bg-navy-50 transition-all duration-300 flex items-center justify-center text-sm md:text-base"
                    >
                      <FaEdit className="mr-1 md:mr-2 text-xs md:text-sm" />
                      Edit
                    </button>
                    <button
                      onClick={submitRSVP}
                      disabled={isSending}
                      className={`flex-1 py-2 md:py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-lg font-medium hover:from-orange-700 hover:to-orange-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center text-sm md:text-base ${isSending ? 'opacity-70 cursor-not-allowed' : ''}`}
                    >
                      {isSending ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <FaCheck className="mr-1 md:mr-2 text-xs md:text-sm" />
                          Confirm
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Submission Confirmation */}
        {isSubmitted && (
          <div className="max-w-md mx-auto text-center">
            <div className={`p-6 md:p-8 bg-white rounded-xl shadow-lg transition-all duration-300 ${showConfetti ? 'transform scale-105' : ''}`}>
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-r from-navy-100 to-navy-50 rounded-full flex items-center justify-center mx-auto mb-4 md:mb-6">
                {formData.attending === 'yes' ? (
                  <FaGlassCheers className="text-2xl md:text-3xl text-gold-500 animate-pulse" />
                ) : (
                  <FaSadTear className="text-2xl md:text-3xl text-orange-600" />
                )}
              </div>
              
              {formData.attending === 'yes' ? (
                <>
                  <h3 className="text-xl md:text-2xl font-serif text-navy-900 mb-3 md:mb-4">
                    Thank You, {formData.name}!
                  </h3>
                  <p className="text-navy-700 mb-4 md:mb-6 text-sm md:text-base">
                    We're thrilled you'll be joining us{guestCount > 1 ? ` with ${guestCount} guests` : ''}. 
                    Your presence will make our day even more special!
                  </p>
                </>
              ) : (
                <>
                  <h3 className="text-xl md:text-2xl font-serif text-navy-900 mb-3 md:mb-4">
                    We'll Miss You, {formData.name}
                  </h3>
                  <p className="text-navy-700 mb-4 md:mb-6 text-sm md:text-base">
                    Thank you for letting us know. While we're sad you can't join us, 
                    we appreciate you taking the time to respond.
                  </p>
                </>
              )}

            </div>
          </div>
        )}
      </div>

      {/* Cancel RSVP Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-xl font-serif text-navy-900 mb-4">Cancel RSVP?</h3>
            <p className="text-navy-700 mb-6">Are you sure you want to cancel? Your RSVP won't be saved.</p>
            <div className="flex space-x-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="flex-1 py-2 bg-navy-100 text-navy-800 rounded-lg font-medium hover:bg-navy-200 transition-colors"
              >
                Go Back
              </button>
              <button
                onClick={confirmCancel}
                className="flex-1 py-2 bg-orange-600 text-white rounded-lg font-medium hover:bg-orange-700 transition-colors"
              >
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default RSVPSection;