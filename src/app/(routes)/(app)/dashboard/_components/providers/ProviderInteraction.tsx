'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Icon from '../common/Icon';
import styles from './ProviderInteraction.module.scss';

// Sample providers data
const providers = [
  {
    id: 'prov1',
    name: 'Sarah Johnson',
    avatar: '/avatars/sarah.jpg',
    role: 'Cleaning Specialist',
    rating: 4.9,
    reviewsCount: 124,
    services: ['Home Cleaning'],
    lastService: '2025-03-11',
    bio: 'Sarah has been with Metro Mellow for 3 years and specializes in deep cleaning and organization. She has a keen eye for detail and takes pride in leaving homes spotless.',
    badges: ['Top Rated', 'Veteran'],
    availability: {
      nextAvailable: '2025-03-18',
      preferredTime: '9:00 AM - 12:00 PM'
    }
  },
  {
    id: 'prov2',
    name: 'Michael Chen',
    avatar: '/avatars/michael.jpg',
    role: 'Laundry & Garment Care',
    rating: 4.8,
    reviewsCount: 98,
    services: ['Laundry Service'],
    lastService: '2025-03-12',
    bio: 'Michael is an expert in fabric care with over 5 years of experience. He specializes in handling delicate garments and has extensive knowledge of stain removal techniques.',
    badges: ['Fabric Specialist'],
    availability: {
      nextAvailable: '2025-03-19',
      preferredTime: '2:00 PM - 5:00 PM'
    }
  },
  {
    id: 'prov3',
    name: 'Robert Wilson',
    avatar: '/avatars/robert.jpg',
    role: 'Pest Control Technician',
    rating: 4.7,
    reviewsCount: 87,
    services: ['Pest Control'],
    lastService: '2025-02-15',
    bio: 'Robert is a certified pest control technician with expertise in safe and effective pest management. He focuses on eco-friendly solutions for lasting results.',
    badges: ['Eco-Friendly'],
    availability: {
      nextAvailable: '2025-03-20',
      preferredTime: '10:00 AM - 1:00 PM'
    }
  }
];

// Sample feedback data
const feedback = [
  {
    id: 'fb1',
    providerId: 'prov1',
    rating: 5,
    comment: 'Sarah did an amazing job! My home has never been cleaner. She paid attention to every detail and was very professional.',
    date: '2025-03-11',
    user: 'John D.'
  },
  {
    id: 'fb2',
    providerId: 'prov2',
    rating: 4,
    comment: 'Michael handled my laundry with care. All stains were removed and my clothes smell great. Very satisfied with the service.',
    date: '2025-03-12',
    user: 'Emily S.'
  },
  {
    id: 'fb3',
    providerId: 'prov1',
    rating: 5,
    comment: 'Consistently excellent service from Sarah. She is reliable, thorough, and always goes the extra mile.',
    date: '2025-03-04',
    user: 'David W.'
  }
];

// Sample messages data
const messages = [
  {
    id: 'msg1',
    providerId: 'prov1',
    sender: 'provider',
    content: 'Hello! Just confirming our appointment for next Monday at 9 AM. Is there anything specific you would like me to focus on during the cleaning?',
    timestamp: '2025-03-12T14:23:00'
  },
  {
    id: 'msg2',
    providerId: 'prov1',
    sender: 'user',
    content: 'Hi Sarah! Yes, Monday at 9 AM works great. If you could please pay extra attention to the kitchen and bathroom, that would be wonderful. Thank you!',
    timestamp: '2025-03-12T15:10:00'
  },
  {
    id: 'msg3',
    providerId: 'prov1',
    sender: 'provider',
    content: 'Absolutely! I will make sure those areas receive special attention. See you on Monday!',
    timestamp: '2025-03-12T15:45:00'
  }
];

export default function ProviderInteraction() {
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'messages' | 'feedback'>('profile');
  const [messageText, setMessageText] = useState('');
  
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const formatTime = (timestampStr: string) => {
    const date = new Date(timestampStr);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };
  
  const getProviderMessages = (providerId: string) => {
    return messages.filter(message => message.providerId === providerId);
  };
  
  const getProviderFeedback = (providerId: string) => {
    return feedback.filter(fb => fb.providerId === providerId);
  };
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedProvider) return;
    
    // In a real app, this would send the message to an API
    console.log(`Sending message to ${selectedProvider}: ${messageText}`);
    setMessageText('');
  };
  
  const getStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    
    return (
      <div className={styles.provider__stars}>
        {Array(fullStars).fill(0).map((_, i) => (
          <Icon key={`full-${i}`} name="star" className={styles.provider__starFull} />
        ))}
        {halfStar && <Icon name="star-half" className={styles.provider__starHalf} />}
        {Array(emptyStars).fill(0).map((_, i) => (
          <Icon key={`empty-${i}`} name="star" className={styles.provider__starEmpty} />
        ))}
      </div>
    );
  };
  
  return (
    <div className={styles.providers}>
      <header className={styles.providers__header}>
        <div>
          <h1 className={styles.providers__title}>Your Service Providers</h1>
          <p className={styles.providers__subtitle}>
            View, message, and manage your service professionals
          </p>
        </div>
      </header>
      
      <div className={styles.providers__layout}>
        <div className={styles.providers__sidebar}>
          <div className={styles.providers__searchBar}>
            <Icon name="search" className={styles.providers__searchIcon} />
            <input 
              type="text" 
              className={styles.providers__searchInput} 
              placeholder="Search providers..." 
            />
          </div>
          
          <div className={styles.providers__list}>
            {providers.map((provider) => (
              <div 
                key={provider.id}
                className={`${styles.providers__item} ${
                  selectedProvider === provider.id ? styles['providers__item--active'] : ''
                }`}
                onClick={() => {
                  setSelectedProvider(provider.id);
                  setActiveTab('profile');
                }}
              >
                <div className={styles.providers__avatar}>
                  {provider.avatar ? (
                    <Image 
                      src={provider.avatar} 
                      alt={provider.name} 
                      width={48} 
                      height={48}
                      className={styles.providers__avatarImg}
                    />
                  ) : (
                    <div className={styles.providers__avatarPlaceholder}>
                      {provider.name.split(' ').map(n => n[0]).join('')}
                    </div>
                  )}
                </div>
                
                <div className={styles.providers__info}>
                  <h3 className={styles.providers__name}>{provider.name}</h3>
                  <p className={styles.providers__role}>{provider.role}</p>
                  <div className={styles.providers__rating}>
                    <span className={styles.providers__ratingValue}>{provider.rating}</span>
                    <Icon name="star" className={styles.providers__ratingIcon} />
                    <span className={styles.providers__ratingCount}>
                      ({provider.reviewsCount})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className={styles.providers__main}>
          {selectedProvider ? (
            <>
              {(() => {
                const provider = providers.find(p => p.id === selectedProvider);
                if (!provider) return null;
                
                return (
                  <>
                    <div className={styles.providers__header}>
                      <div className={styles.providers__providerProfile}>
                        <div className={styles.providers__profileAvatar}>
                          {provider.avatar ? (
                            <Image 
                              src={provider.avatar} 
                              alt={provider.name} 
                              width={80} 
                              height={80}
                              className={styles.providers__profileAvatarImg}
                            />
                          ) : (
                            <div className={styles.providers__profileAvatarPlaceholder}>
                              {provider.name.split(' ').map(n => n[0]).join('')}
                            </div>
                          )}
                        </div>
                        
                        <div className={styles.providers__profileInfo}>
                          <h2 className={styles.providers__profileName}>{provider.name}</h2>
                          <p className={styles.providers__profileRole}>{provider.role}</p>
                          <div className={styles.providers__profileMeta}>
                            <div className={styles.providers__profileRating}>
                              {getStars(provider.rating)}
                              <span className={styles.providers__profileRatingValue}>
                                {provider.rating}
                              </span>
                              <span className={styles.providers__profileRatingCount}>
                                ({provider.reviewsCount} reviews)
                              </span>
                            </div>
                            <div className={styles.providers__profileServices}>
                              <span className={styles.providers__profileServicesLabel}>
                                Services:
                              </span>
                              {provider.services.map((service, index) => (
                                <span key={index} className={styles.providers__profileService}>
                                  {service}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className={styles.providers__profileActions}>
                          <button 
                            className={styles.providers__profileBtn}
                            onClick={() => setActiveTab('messages')}
                          >
                            <Icon name="message-square" />
                            Message
                          </button>
                          <button className={styles.providers__profileBtn}>
                            <Icon name="calendar" />
                            Book
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    <div className={styles.providers__tabs}>
                      <button 
                        className={`${styles.providers__tab} ${
                          activeTab === 'profile' ? styles['providers__tab--active'] : ''
                        }`}
                        onClick={() => setActiveTab('profile')}
                      >
                        <Icon name="user" />
                        Profile
                      </button>
                      <button 
                        className={`${styles.providers__tab} ${
                          activeTab === 'messages' ? styles['providers__tab--active'] : ''
                        }`}
                        onClick={() => setActiveTab('messages')}
                      >
                        <Icon name="message-square" />
                        Messages
                      </button>
                      <button 
                        className={`${styles.providers__tab} ${
                          activeTab === 'feedback' ? styles['providers__tab--active'] : ''
                        }`}
                        onClick={() => setActiveTab('feedback')}
                      >
                        <Icon name="star" />
                        Feedback
                      </button>
                    </div>
                    
                    <div className={styles.providers__content}>
                      <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                          <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className={styles.providers__profileSection}>
                              <h3 className={styles.providers__sectionTitle}>About</h3>
                              <p className={styles.providers__bio}>{provider.bio}</p>
                            </div>
                            
                            {provider.badges && provider.badges.length > 0 && (
                              <div className={styles.providers__profileSection}>
                                <h3 className={styles.providers__sectionTitle}>Badges</h3>
                                <div className={styles.providers__badges}>
                                  {provider.badges.map((badge, index) => (
                                    <span key={index} className={styles.providers__badge}>
                                      {badge}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            
                            <div className={styles.providers__profileSection}>
                              <h3 className={styles.providers__sectionTitle}>Availability</h3>
                              <div className={styles.providers__availability}>
                                <div className={styles.providers__availabilityItem}>
                                  <span className={styles.providers__availabilityLabel}>
                                    Next Available:
                                  </span>
                                  <span className={styles.providers__availabilityValue}>
                                    {formatDate(provider.availability.nextAvailable)}
                                  </span>
                                </div>
                                <div className={styles.providers__availabilityItem}>
                                  <span className={styles.providers__availabilityLabel}>
                                    Preferred Time:
                                  </span>
                                  <span className={styles.providers__availabilityValue}>
                                    {provider.availability.preferredTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className={styles.providers__profileSection}>
                              <h3 className={styles.providers__sectionTitle}>Recent Reviews</h3>
                              <div className={styles.providers__reviews}>
                                {getProviderFeedback(provider.id).slice(0, 2).map((review) => (
                                  <div key={review.id} className={styles.providers__review}>
                                    <div className={styles.providers__reviewHeader}>
                                      <div className={styles.providers__reviewRating}>
                                        {getStars(review.rating)}
                                      </div>
                                      <div className={styles.providers__reviewDate}>
                                        {formatDate(review.date)}
                                      </div>
                                    </div>
                                    <p className={styles.providers__reviewComment}>
                                      {review.comment}
                                    </p>
                                    <div className={styles.providers__reviewUser}>
                                      {review.user}
                                    </div>
                                  </div>
                                ))}
                                
                                <button 
                                  className={styles.providers__viewMoreBtn}
                                  onClick={() => setActiveTab('feedback')}
                                >
                                  View All Reviews
                                  <Icon name="arrow-right" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                        
                        {activeTab === 'messages' && (
                          <motion.div
                            key="messages"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                            className={styles.providers__chat}
                          >
                            <div className={styles.providers__chatHeader}>
                              <h3 className={styles.providers__chatTitle}>
                                Messages with {provider.name}
                              </h3>
                            </div>
                            
                            <div className={styles.providers__messages}>
                              {getProviderMessages(provider.id).map((message) => (
                                <div 
                                  key={message.id}
                                  className={`${styles.providers__message} ${
                                    message.sender === 'user' ? styles['providers__message--outgoing'] : ''
                                  }`}
                                >
                                  {message.sender === 'provider' && (
                                    <div className={styles.providers__messageAvatar}>
                                      {provider.avatar ? (
                                        <Image 
                                          src={provider.avatar} 
                                          alt={provider.name} 
                                          width={36} 
                                          height={36}
                                          className={styles.providers__messageAvatarImg}
                                        />
                                      ) : (
                                        <div className={styles.providers__messageAvatarPlaceholder}>
                                          {provider.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                      )}
                                    </div>
                                  )}
                                  <div className={styles.providers__messageContent}>
                                    <div className={styles.providers__messageBubble}>
                                      {message.content}
                                    </div>
                                    <div className={styles.providers__messageTime}>
                                      {formatTime(message.timestamp)}
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                            
                            <form 
                              className={styles.providers__messageForm}
                              onSubmit={handleSendMessage}
                            >
                              <input 
                                type="text" 
                                className={styles.providers__messageInput}
                                placeholder="Type your message..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                              />
                              <button 
                                type="submit"
                                className={styles.providers__sendBtn}
                                disabled={!messageText.trim()}
                              >
                                <Icon name="send" />
                              </button>
                            </form>
                          </motion.div>
                        )}
                        
                        {activeTab === 'feedback' && (
                          <motion.div
                            key="feedback"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3 }}
                          >
                            <div className={styles.providers__feedbackHeader}>
                              <h3 className={styles.providers__sectionTitle}>
                                Reviews & Ratings
                              </h3>
                              <div className={styles.providers__overallRating}>
                                <div className={styles.providers__ratingLarge}>
                                  {provider.rating}
                                </div>
                                <div className={styles.providers__ratingStars}>
                                  {getStars(provider.rating)}
                                  <span className={styles.providers__ratingTotal}>
                                    ({provider.reviewsCount} reviews)
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            <div className={styles.providers__reviewsList}>
                              {getProviderFeedback(provider.id).map((review) => (
                                <div key={review.id} className={styles.providers__reviewFull}>
                                  <div className={styles.providers__reviewHeader}>
                                    <div>
                                      <div className={styles.providers__reviewUser}>
                                        {review.user}
                                      </div>
                                      <div className={styles.providers__reviewDate}>
                                        {formatDate(review.date)}
                                      </div>
                                    </div>
                                    <div className={styles.providers__reviewRating}>
                                      {getStars(review.rating)}
                                    </div>
                                  </div>
                                  <p className={styles.providers__reviewComment}>
                                    {review.comment}
                                  </p>
                                </div>
                              ))}
                            </div>
                            
                            <div className={styles.providers__leaveFeedback}>
                              <h3 className={styles.providers__sectionTitle}>
                                Leave Feedback
                              </h3>
                              <div className={styles.providers__feedbackForm}>
                                <div className={styles.providers__ratingSelector}>
                                  <span className={styles.providers__ratingLabel}>
                                    Rate your experience:
                                  </span>
                                  <div className={styles.providers__ratingStars}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <button 
                                        key={star}
                                        className={styles.providers__ratingStar}
                                      >
                                        <Icon name="star" />
                                      </button>
                                    ))}
                                  </div>
                                </div>
                                <textarea 
                                  className={styles.providers__feedbackInput}
                                  placeholder="Share your experience with this provider..."
                                  rows={4}
                                ></textarea>
                                <button className={styles.providers__submitFeedback}>
                                  Submit Feedback
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </>
                );
              })()}
            </>
          ) : (
            <div className={styles.providers__empty}>
              <div className={styles.providers__emptyIcon}>
                <Icon name="users" />
              </div>
              <h2 className={styles.providers__emptyTitle}>
                Select a Provider
              </h2>
              <p className={styles.providers__emptyText}>
                Choose a service provider from the list to view their profile, send messages, or leave feedback.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}