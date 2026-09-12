import { useState } from 'react'

import { Metadata } from '@redwoodjs/web'

const WelcomePage = () => {
  const [step, setStep] = useState(1)
  const totalSteps = 5
  const [isSubmitting, setIsSubmitting] = useState(false)

  const [formData, setFormData] = useState({
    websiteTypes: [] as string[],
    otherWebsite: '',
    fullName: '',
    email: '',
    phone: '',
    whatsapp: '',
    budget: '',
    comment: '',
  })

  const websiteTypesList = [
    'Hotel Full Page Web Application',
    'E-commerce Website',
    'Restaurant Website',
    'Real Estate Website',
    'Portfolio Website',
    'Blog / News Website',
    'School / LMS Platform',
    'Hospital / Clinic Website',
    'NGO / Charity Website',
    'Booking / Reservation System',
    'Travel Agency Website',
    'Gym / Fitness Website',
    'Salon / Spa Website',
    'Church / Ministry Website',
    'Personal Business Website',
    'Event / Wedding Website',
    'Crowdfunding Platform',
    'Job Board Website',
    'Social Media Platform',
    'Video Streaming Website',
    'Podcast Website',
    'Digital Agency Website',
    'Law Firm Website',
    'Car Dealership Website',
    'Farm / Agriculture Website',
    'Music / Artist Website',
    'Photography Website',
    'Forum / Community Website',
    'SaaS Application',
    'Custom Web App',
  ]

  const handleCheckboxChange = (value: string) => {
    setFormData((prev) => {
      const currentList = prev.websiteTypes
      return {
        ...prev,
        websiteTypes: currentList.includes(value)
          ? currentList.filter((item) => item !== value)
          : [...currentList, value],
      }
    })
  }

  const handleNext = async () => {
    if (step === 2) {
      if (!formData.fullName || !formData.email || !formData.phone) {
        alert('Please fill in your Name, Email, and Phone Number to continue.')
        return
      }
    }

    if (step === 4) {
      setIsSubmitting(true)
      try {
        const allSelectedTypes = [...formData.websiteTypes]
        if (formData.otherWebsite.trim()) {
          allSelectedTypes.push(`Other: ${formData.otherWebsite.trim()}`)
        }

        await fetch('https://formspree.io/f/mljevyjb', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            fullName: formData.fullName,
            email: formData.email,
            phone: formData.phone,
            whatsapp: formData.whatsapp || 'Not provided',
            budget: formData.budget || 'Not specified',
            websiteTypes: allSelectedTypes.join(', ') || 'None selected',
            comment: formData.comment || 'No extra details',
          }),
        })
      } catch (error) {
        console.error('Formspree Error:', error)
      }
      setIsSubmitting(false)
      setStep(5)
    } else if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) setStep(step - 1)
  }

  const handleConfirm = (isCorrect: boolean) => {
    if (isCorrect) {
      setStep(4)
    } else {
      setStep(1)
    }
  }

  const copyPhoneNumber = () => {
    navigator.clipboard.writeText('07051851740')
    alert('Phone number copied! You can now paste it to call.')
  }

  const getShareMessage = () => {
    const allTypes = [...formData.websiteTypes]
    if (formData.otherWebsite.trim())
      allTypes.push(formData.otherWebsite.trim())
    return `Hello, my name is ${formData.fullName || '...'}.%0A%0AI want to build: ${allTypes.join(', ') || '...'}.%0A%0AMy budget is: ${formData.budget || '...'}.%0A%0AExtra details: ${formData.comment || '...'}`
  }

  const whatsappLink = `https://wa.me/2347051851740?text=${getShareMessage()}`
  const telegramLink = `https://t.me/Thevalue011`

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            {websiteTypesList.map((type) => (
              <label key={type} style={styles.optionLabel}>
                <input
                  type="checkbox"
                  checked={formData.websiteTypes.includes(type)}
                  onChange={() => handleCheckboxChange(type)}
                  style={styles.checkbox}
                />
                <span style={styles.optionText}>{type}</span>
              </label>
            ))}
            <input
              type="text"
              placeholder="Other (please specify)..."
              value={formData.otherWebsite}
              onChange={(e) =>
                setFormData({ ...formData, otherWebsite: e.target.value })
              }
              style={{ ...styles.input, marginTop: '10px' }}
            />
          </>
        )

      case 2:
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              width: '100%',
            }}
          >
            <input
              type="text"
              placeholder="Full Name *"
              value={formData.fullName}
              onChange={(e) =>
                setFormData({ ...formData, fullName: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="email"
              placeholder="Email Address *"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="tel"
              placeholder="Phone Number *"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              style={styles.input}
            />
            <input
              type="tel"
              placeholder="WhatsApp Number (Optional)"
              value={formData.whatsapp}
              onChange={(e) =>
                setFormData({ ...formData, whatsapp: e.target.value })
              }
              style={styles.input}
            />
          </div>
        )

      case 3:
        const confirmList = [...formData.websiteTypes]
        if (formData.otherWebsite.trim())
          confirmList.push(`Other: ${formData.otherWebsite.trim()}`)

        return (
          <div style={styles.summaryCard}>
            <p
              style={{
                fontSize: '18px',
                marginBottom: '8px',
                color: '#1a1a1a',
              }}
            >
              Hello{' '}
              <strong style={{ color: '#4a90e2' }}>
                {formData.fullName || 'there'}
              </strong>
              ,
            </p>
            <p
              style={{ fontSize: '15px', color: '#555', marginBottom: '15px' }}
            >
              You said you want me to build:
            </p>
            <div style={styles.selectedList}>
              {confirmList.length > 0 ? (
                confirmList.map((type, i) => (
                  <div key={i} style={styles.selectedItem}>
                    • {type}
                  </div>
                ))
              ) : (
                <div style={{ color: '#888', fontStyle: 'italic' }}>
                  No website types selected.
                </div>
              )}
            </div>
            <p
              style={{
                fontSize: '16px',
                marginTop: '25px',
                marginBottom: '15px',
                fontWeight: 'bold',
                color: '#1a1a1a',
              }}
            >
              Is this correct?
            </p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                type="button"
                onClick={() => handleConfirm(true)}
                style={styles.trueBtn}
              >
                True
              </button>
              <button
                type="button"
                onClick={() => handleConfirm(false)}
                style={styles.falseBtn}
              >
                False
              </button>
            </div>
          </div>
        )

      case 4:
        const quickBudgets = [
          '₦50k',
          '₦80k',
          '₦100k',
          '₦150k',
          '₦200k',
          '₦300k',
        ]
        return (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              width: '100%',
            }}
          >
            <input
              type="text"
              placeholder="Enter your budget (e.g., ₦50,000)"
              value={formData.budget}
              onChange={(e) =>
                setFormData({ ...formData, budget: e.target.value })
              }
              style={styles.input}
            />
            <p
              style={{
                fontSize: '13px',
                color: '#888',
                margin: '5px 0 0 0',
                textAlign: 'center',
              }}
            >
              Or select a quick range:
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '10px',
                justifyContent: 'center',
              }}
            >
              {quickBudgets.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => setFormData({ ...formData, budget: amount })}
                  style={{
                    padding: '12px 18px',
                    borderRadius: '25px',
                    border:
                      formData.budget === amount
                        ? '2px solid #4a90e2'
                        : '1px solid #ddd',
                    backgroundColor:
                      formData.budget === amount ? '#eef5ff' : '#ffffff',
                    color: formData.budget === amount ? '#4a90e2' : '#555',
                    fontSize: '14px',
                    cursor: 'pointer',
                    fontWeight: formData.budget === amount ? 'bold' : 'normal',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {amount}
                </button>
              ))}
            </div>
          </div>
        )

      case 5:
        return (
          <div style={styles.contactCard}>
            <div
              style={{
                display: 'flex',
                gap: '15px',
                justifyContent: 'center',
                marginBottom: '30px',
                flexWrap: 'wrap',
              }}
            >
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.socialBtn, backgroundColor: '#25D366' }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <span>WhatsApp</span>
              </a>

              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...styles.socialBtn, backgroundColor: '#0088cc' }}
              >
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
                </svg>
                <span>Telegram</span>
              </a>
            </div>

            <p
              style={{
                fontSize: '13px',
                color: '#aaa',
                marginBottom: '20px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                fontWeight: 'bold',
              }}
            >
              OR CALL DIRECTLY
            </p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <span
                style={{
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: '#1a1a1a',
                  letterSpacing: '1px',
                }}
              >
                0705 185 1740
              </span>
              <button
                onClick={copyPhoneNumber}
                style={{
                  padding: '8px 20px',
                  backgroundColor: '#4a90e2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '20px',
                  fontSize: '13px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginTop: '4px',
                }}
              >
                COPY NUMBER
              </button>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  const stepData = [
    {
      title: 'WHAT TYPE OF WEBSITE DO YOU NEED ME TO BUILD FOR YOU?',
      subtitle: 'Select all the options that match what you need.',
    },
    {
      title: 'YOUR PERSONAL DETAILS',
      subtitle: 'Enter your details below so I can contact you.',
    },
    {
      title: 'CONFIRM YOUR SELECTIONS',
      subtitle: 'Please review your name and website choices below.',
    },
    {
      title: 'WHAT IS YOUR BUDGET?',
      subtitle:
        'Let me know how much you are willing to spend on this project.',
    },
    {
      title: 'CONNECT WITH ME',
      subtitle: 'Choose how you want to reach me. Click below to continue.',
    },
  ]

  return (
    <>
      <Metadata title="Welcome" description="Welcome page" />

      <style>{`
        /* Fixed container alignment so content stretches to full width */
        body, html { margin: 0; padding: 0; height: 100%; overflow: hidden; background-color: #f4f7f6; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
        #redwood-app { height: 100vh; overflow: hidden; display: flex; flex-direction: column; width: 100%; }
        * { box-sizing: border-box; }

        /* Hide scrollbar */
        .mainContainer::-webkit-scrollbar { display: none; }
        .mainContainer { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div style={styles.header}>
        <h2 style={styles.headerTitle}>{stepData[step - 1].title}</h2>
        <p style={styles.headerSubtitle}>{stepData[step - 1].subtitle}</p>

        <div style={styles.progressBarBg}>
          <div
            style={{
              ...styles.progressBarFill,
              width: `${(step / totalSteps) * 100}%`,
            }}
          />
        </div>
        <div style={styles.stepText}>
          Step {step} of {totalSteps}
        </div>
      </div>

      <div className="mainContainer" style={styles.mainContainer}>
        <form
          onSubmit={(e) => e.preventDefault()}
          id="website-form"
          style={{ width: '100%' }}
        >
          {renderStepContent()}
        </form>
      </div>

      {step !== 5 && (
        <div style={styles.footer}>
          <div style={styles.footerContent}>
            {step > 1 && step !== 3 && (
              <button
                type="button"
                onClick={handleBack}
                style={styles.backBtn}
                disabled={isSubmitting}
              >
                Back
              </button>
            )}
            {step !== 3 && (
              <button
                type="button"
                onClick={handleNext}
                disabled={isSubmitting}
                style={{
                  ...styles.nextBtn,
                  width: step === 1 ? '100%' : 'auto',
                  flex: step === 1 ? 1 : 'none',
                  opacity: isSubmitting ? 0.7 : 1,
                }}
              >
                {isSubmitting
                  ? 'Sending...'
                  : step === totalSteps
                    ? 'Submit'
                    : 'Next'}
              </button>
            )}
          </div>
        </div>
      )}
    </>
  )
}

const styles: Record<string, React.CSSProperties> = {
  header: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    padding: '16px 20px 10px 20px',
    background: 'rgba(244, 247, 246, 0.95)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    zIndex: 100,
    borderBottom: '1px solid #e0e0e0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 'clamp(14px, 4vw, 16px)',
    color: '#1a1a1a',
    textAlign: 'center',
    margin: '0 0 4px 0',
    fontWeight: '700',
  },
  headerSubtitle: {
    fontSize: '12px',
    color: '#666',
    textAlign: 'center',
    margin: '0 0 12px 0',
    fontWeight: '400',
  },
  progressBarBg: {
    width: '100%',
    maxWidth: '500px',
    height: '6px',
    backgroundColor: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#4a90e2',
    transition: 'width 0.3s ease',
    borderRadius: '10px',
  },
  stepText: {
    fontSize: '11px',
    color: '#888',
    marginTop: '6px',
    fontWeight: '600',
  },

  // INCREASED WIDTH: Max-width is now 800px and width is 100%
  mainContainer: {
    flex: 1,
    overflowY: 'auto',
    paddingTop: '140px',
    paddingBottom: '120px',
    paddingLeft: '16px',
    paddingRight: '16px',
    width: '100%',
    maxWidth: '800px',
    margin: '0 auto',
    WebkitOverflowScrolling: 'touch',
  },

  optionLabel: {
    display: 'flex',
    alignItems: 'center',
    padding: '16px',
    background: '#ffffff',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    marginBottom: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: '100%',
  },
  checkbox: {
    marginRight: '14px',
    width: '20px',
    height: '20px',
    accentColor: '#4a90e2',
    cursor: 'pointer',
  },
  optionText: { flex: 1, lineHeight: '1.4', fontSize: '15px', color: '#333' },
  input: {
    width: '100%',
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  textarea: {
    width: '100%',
    padding: '16px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    resize: 'vertical',
    height: '120px',
    backgroundColor: '#ffffff',
    outline: 'none',
  },
  summaryCard: {
    background: '#ffffff',
    padding: '24px',
    borderRadius: '16px',
    border: '1px solid #e0e0e0',
    textAlign: 'center',
    width: '100%',
  },
  selectedList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    textAlign: 'left',
    background: '#f9fbfd',
    padding: '16px',
    borderRadius: '12px',
    border: '1px dashed #d0d7de',
  },
  selectedItem: { fontSize: '14px', color: '#333', fontWeight: '500' },
  trueBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#28a745',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  falseBtn: {
    flex: 1,
    padding: '14px',
    backgroundColor: '#dc3545',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  footer: {
    position: 'fixed',
    bottom: 0,
    left: 0,
    width: '100%',
    padding: '16px 20px 30px 20px',
    background: 'linear-gradient(to top, #f4f7f6 80%, transparent)',
    zIndex: 100,
  },
  footerContent: {
    display: 'flex',
    gap: '10px',
    maxWidth: '500px',
    margin: '0 auto',
  },
  backBtn: {
    padding: '16px 20px',
    backgroundColor: '#ffffff',
    color: '#4a90e2',
    border: '1px solid #4a90e2',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  nextBtn: {
    padding: '16px',
    backgroundColor: '#4a90e2',
    color: 'white',
    border: 'none',
    borderRadius: '14px',
    fontSize: '17px',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'transform 0.1s ease',
  },
  contactCard: {
    background: '#ffffff',
    padding: '30px 20px',
    borderRadius: '16px',
    border: '1px solid #e0e0e0',
    textAlign: 'center',
    width: '100%',
  },
  socialBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '14px 20px',
    color: 'white',
    textDecoration: 'none',
    borderRadius: '12px',
    fontSize: '15px',
    fontWeight: 'bold',
  },
}

export default WelcomePage
