'use client';

import React, { useState, useRef } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PhoneInput } from 'react-international-phone';
import 'react-international-phone/style.css';
import { Upload, CheckCircle, AlertCircle, Loader2, Send, FileText, X } from 'lucide-react';

/* ── US States & Cities ── */
const US_STATES = [
  { value: '', label: 'Select State' },
  { value: 'AL', label: 'Alabama' }, { value: 'AK', label: 'Alaska' },
  { value: 'AZ', label: 'Arizona' }, { value: 'AR', label: 'Arkansas' },
  { value: 'CA', label: 'California' }, { value: 'CO', label: 'Colorado' },
  { value: 'CT', label: 'Connecticut' }, { value: 'DE', label: 'Delaware' },
  { value: 'FL', label: 'Florida' }, { value: 'GA', label: 'Georgia' },
  { value: 'HI', label: 'Hawaii' }, { value: 'ID', label: 'Idaho' },
  { value: 'IL', label: 'Illinois' }, { value: 'IN', label: 'Indiana' },
  { value: 'IA', label: 'Iowa' }, { value: 'KS', label: 'Kansas' },
  { value: 'KY', label: 'Kentucky' }, { value: 'LA', label: 'Louisiana' },
  { value: 'ME', label: 'Maine' }, { value: 'MD', label: 'Maryland' },
  { value: 'MA', label: 'Massachusetts' }, { value: 'MI', label: 'Michigan' },
  { value: 'MN', label: 'Minnesota' }, { value: 'MS', label: 'Mississippi' },
  { value: 'MO', label: 'Missouri' }, { value: 'MT', label: 'Montana' },
  { value: 'NE', label: 'Nebraska' }, { value: 'NV', label: 'Nevada' },
  { value: 'NH', label: 'New Hampshire' }, { value: 'NJ', label: 'New Jersey' },
  { value: 'NM', label: 'New Mexico' }, { value: 'NY', label: 'New York' },
  { value: 'NC', label: 'North Carolina' }, { value: 'ND', label: 'North Dakota' },
  { value: 'OH', label: 'Ohio' }, { value: 'OK', label: 'Oklahoma' },
  { value: 'OR', label: 'Oregon' }, { value: 'PA', label: 'Pennsylvania' },
  { value: 'RI', label: 'Rhode Island' }, { value: 'SC', label: 'South Carolina' },
  { value: 'SD', label: 'South Dakota' }, { value: 'TN', label: 'Tennessee' },
  { value: 'TX', label: 'Texas' }, { value: 'UT', label: 'Utah' },
  { value: 'VT', label: 'Vermont' }, { value: 'VA', label: 'Virginia' },
  { value: 'WA', label: 'Washington' }, { value: 'WV', label: 'West Virginia' },
  { value: 'WI', label: 'Wisconsin' }, { value: 'WY', label: 'Wyoming' },
  { value: 'DC', label: 'District of Columbia' },
];

const STATE_CITIES = {
  AL: ['Birmingham', 'Montgomery', 'Huntsville', 'Mobile', 'Tuscaloosa', 'Hoover', 'Dothan', 'Auburn', 'Decatur', 'Madison'],
  AK: ['Anchorage', 'Fairbanks', 'Juneau', 'Sitka', 'Ketchikan', 'Wasilla', 'Kenai', 'Kodiak', 'Bethel', 'Palmer'],
  AZ: ['Phoenix', 'Tucson', 'Mesa', 'Chandler', 'Scottsdale', 'Glendale', 'Gilbert', 'Tempe', 'Peoria', 'Surprise'],
  AR: ['Little Rock', 'Fort Smith', 'Fayetteville', 'Springdale', 'Jonesboro', 'Rogers', 'Conway', 'North Little Rock', 'Bentonville', 'Pine Bluff'],
  CA: ['Los Angeles', 'San Francisco', 'San Diego', 'San Jose', 'Sacramento', 'Fresno', 'Oakland', 'Long Beach', 'Bakersfield', 'Anaheim', 'Santa Ana', 'Riverside', 'Stockton', 'Irvine', 'Chula Vista'],
  CO: ['Denver', 'Colorado Springs', 'Aurora', 'Fort Collins', 'Lakewood', 'Thornton', 'Arvada', 'Westminster', 'Pueblo', 'Boulder'],
  CT: ['Bridgeport', 'New Haven', 'Stamford', 'Hartford', 'Waterbury', 'Norwalk', 'Danbury', 'New Britain', 'Bristol', 'Meriden'],
  DE: ['Wilmington', 'Dover', 'Newark', 'Middletown', 'Smyrna', 'Milford', 'Seaford', 'Georgetown', 'Elsmere', 'New Castle'],
  FL: ['Miami', 'Orlando', 'Tampa', 'Jacksonville', 'Fort Lauderdale', 'St. Petersburg', 'Hialeah', 'Tallahassee', 'Cape Coral', 'Port St. Lucie', 'Hollywood', 'Pembroke Pines', 'Gainesville', 'Coral Springs'],
  GA: ['Atlanta', 'Augusta', 'Columbus', 'Savannah', 'Athens', 'Macon', 'Sandy Springs', 'Roswell', 'Albany', 'Johns Creek'],
  HI: ['Honolulu', 'Pearl City', 'Hilo', 'Kailua', 'Waipahu', 'Kaneohe', 'Mililani Town', 'Kahului', 'Ewa Gentry', 'Kihei'],
  ID: ['Boise', 'Meridian', 'Nampa', 'Idaho Falls', 'Caldwell', 'Pocatello', 'Coeur d\'Alene', 'Twin Falls', 'Lewiston', 'Post Falls'],
  IL: ['Chicago', 'Aurora', 'Rockford', 'Joliet', 'Naperville', 'Springfield', 'Peoria', 'Elgin', 'Champaign', 'Waukegan'],
  IN: ['Indianapolis', 'Fort Wayne', 'Evansville', 'South Bend', 'Carmel', 'Fishers', 'Bloomington', 'Hammond', 'Gary', 'Lafayette'],
  IA: ['Des Moines', 'Cedar Rapids', 'Davenport', 'Sioux City', 'Iowa City', 'Waterloo', 'Ames', 'West Des Moines', 'Council Bluffs', 'Ankeny'],
  KS: ['Wichita', 'Overland Park', 'Kansas City', 'Olathe', 'Topeka', 'Lawrence', 'Shawnee', 'Manhattan', 'Lenexa', 'Salina'],
  KY: ['Louisville', 'Lexington', 'Bowling Green', 'Owensboro', 'Covington', 'Georgetown', 'Richmond', 'Florence', 'Hopkinsville', 'Nicholasville'],
  LA: ['New Orleans', 'Baton Rouge', 'Shreveport', 'Lafayette', 'Lake Charles', 'Kenner', 'Bossier City', 'Monroe', 'Alexandria', 'Houma'],
  ME: ['Portland', 'Lewiston', 'Bangor', 'South Portland', 'Auburn', 'Biddeford', 'Sanford', 'Augusta', 'Saco', 'Scarborough'],
  MD: ['Baltimore', 'Frederick', 'Rockville', 'Gaithersburg', 'Bowie', 'Hagerstown', 'Annapolis', 'College Park', 'Salisbury', 'Laurel'],
  MA: ['Boston', 'Worcester', 'Springfield', 'Cambridge', 'Lowell', 'Brockton', 'New Bedford', 'Quincy', 'Lynn', 'Fall River'],
  MI: ['Detroit', 'Grand Rapids', 'Warren', 'Sterling Heights', 'Ann Arbor', 'Lansing', 'Flint', 'Dearborn', 'Livonia', 'Troy'],
  MN: ['Minneapolis', 'St. Paul', 'Rochester', 'Duluth', 'Bloomington', 'Brooklyn Park', 'Plymouth', 'Maple Grove', 'Woodbury', 'St. Cloud'],
  MS: ['Jackson', 'Gulfport', 'Southaven', 'Hattiesburg', 'Biloxi', 'Meridian', 'Tupelo', 'Olive Branch', 'Greenville', 'Horn Lake'],
  MO: ['Kansas City', 'St. Louis', 'Springfield', 'Columbia', 'Independence', 'Lee\'s Summit', 'O\'Fallon', 'St. Joseph', 'St. Charles', 'Blue Springs'],
  MT: ['Billings', 'Missoula', 'Great Falls', 'Bozeman', 'Butte', 'Helena', 'Kalispell', 'Havre', 'Anaconda', 'Miles City'],
  NE: ['Omaha', 'Lincoln', 'Bellevue', 'Grand Island', 'Kearney', 'Fremont', 'Hastings', 'Norfolk', 'North Platte', 'Columbus'],
  NV: ['Las Vegas', 'Henderson', 'Reno', 'North Las Vegas', 'Sparks', 'Carson City', 'Fernley', 'Elko', 'Mesquite', 'Boulder City'],
  NH: ['Manchester', 'Nashua', 'Concord', 'Derry', 'Dover', 'Rochester', 'Salem', 'Merrimack', 'Londonderry', 'Keene'],
  NJ: ['Newark', 'Jersey City', 'Paterson', 'Elizabeth', 'Trenton', 'Clifton', 'Camden', 'Passaic', 'Union City', 'Bayonne'],
  NM: ['Albuquerque', 'Las Cruces', 'Rio Rancho', 'Santa Fe', 'Roswell', 'Farmington', 'Clovis', 'Hobbs', 'Alamogordo', 'Carlsbad'],
  NY: ['New York City', 'Buffalo', 'Rochester', 'Yonkers', 'Syracuse', 'Albany', 'New Rochelle', 'Mount Vernon', 'Schenectady', 'Utica'],
  NC: ['Charlotte', 'Raleigh', 'Greensboro', 'Durham', 'Winston-Salem', 'Fayetteville', 'Cary', 'Wilmington', 'High Point', 'Asheville'],
  ND: ['Fargo', 'Bismarck', 'Grand Forks', 'Minot', 'West Fargo', 'Williston', 'Dickinson', 'Mandan', 'Jamestown', 'Wahpeton'],
  OH: ['Columbus', 'Cleveland', 'Cincinnati', 'Toledo', 'Akron', 'Dayton', 'Parma', 'Canton', 'Youngstown', 'Lorain'],
  OK: ['Oklahoma City', 'Tulsa', 'Norman', 'Broken Arrow', 'Edmond', 'Lawton', 'Moore', 'Midwest City', 'Enid', 'Stillwater'],
  OR: ['Portland', 'Salem', 'Eugene', 'Gresham', 'Hillsboro', 'Beaverton', 'Bend', 'Medford', 'Springfield', 'Corvallis'],
  PA: ['Philadelphia', 'Pittsburgh', 'Allentown', 'Reading', 'Erie', 'Bethlehem', 'Scranton', 'Lancaster', 'Harrisburg', 'York'],
  RI: ['Providence', 'Warwick', 'Cranston', 'Pawtucket', 'East Providence', 'Woonsocket', 'Newport', 'Central Falls', 'Westerly', 'Bristol'],
  SC: ['Charleston', 'Columbia', 'North Charleston', 'Mount Pleasant', 'Rock Hill', 'Greenville', 'Summerville', 'Goose Creek', 'Hilton Head', 'Florence'],
  SD: ['Sioux Falls', 'Rapid City', 'Aberdeen', 'Brookings', 'Watertown', 'Mitchell', 'Yankton', 'Pierre', 'Huron', 'Spearfish'],
  TN: ['Nashville', 'Memphis', 'Knoxville', 'Chattanooga', 'Clarksville', 'Murfreesboro', 'Franklin', 'Jackson', 'Johnson City', 'Bartlett'],
  TX: ['Houston', 'San Antonio', 'Dallas', 'Austin', 'Fort Worth', 'El Paso', 'Arlington', 'Corpus Christi', 'Plano', 'Laredo', 'Lubbock', 'Garland', 'Irving', 'Amarillo', 'Grand Prairie', 'McKinney', 'Frisco', 'Brownsville', 'Pasadena', 'Mesquite'],
  UT: ['Salt Lake City', 'West Valley City', 'Provo', 'West Jordan', 'Orem', 'Sandy', 'Ogden', 'St. George', 'Layton', 'Taylorsville'],
  VT: ['Burlington', 'South Burlington', 'Rutland', 'Barre', 'Montpelier', 'Winooski', 'St. Albans', 'Newport', 'Vergennes', 'Bennington'],
  VA: ['Virginia Beach', 'Norfolk', 'Chesapeake', 'Richmond', 'Newport News', 'Alexandria', 'Hampton', 'Roanoke', 'Portsmouth', 'Lynchburg'],
  WA: ['Seattle', 'Spokane', 'Tacoma', 'Vancouver', 'Bellevue', 'Kent', 'Everett', 'Renton', 'Federal Way', 'Yakima'],
  WV: ['Charleston', 'Huntington', 'Morgantown', 'Parkersburg', 'Wheeling', 'Weirton', 'Fairmont', 'Martinsburg', 'Beckley', 'Clarksburg'],
  WI: ['Milwaukee', 'Madison', 'Green Bay', 'Kenosha', 'Racine', 'Appleton', 'Waukesha', 'Oshkosh', 'Eau Claire', 'Janesville'],
  WY: ['Cheyenne', 'Casper', 'Laramie', 'Gillette', 'Rock Springs', 'Sheridan', 'Green River', 'Evanston', 'Riverton', 'Jackson'],
  DC: ['Washington'],
};

const HOW_FOUND_OPTIONS = [
  { value: '', label: 'Select an option' },
  { value: 'word_of_mouth', label: 'Word of Mouth' },
  { value: 'google_search', label: 'Google Search' },
  { value: 'social_media', label: 'Social Media' },
  { value: 'trade_show', label: 'Trade Show / Event' },
  { value: 'referral', label: 'Referral from a Partner' },
  { value: 'advertisement', label: 'Advertisement' },
  { value: 'other', label: 'Other' },
];

export default function DistributorSignupPage() {
  const fileInputRef = useRef(null);
  const [phone, setPhone] = useState('');
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    companyName: '',
    streetAddress: '',
    apartment: '',
    state: '',
    city: '',
    zipCode: '',
    taxId: '',
    howFound: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'state' ? { city: '' } : {}),
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const removeFile = () => {
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'YreWu9jrl7hIbkk2TXgyy';
    const templateID = process.env.NEXT_PUBLIC_EMAILJS_DISTRIBUTOR_TEMPLATE_ID || process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || 'template_89o9v1p';
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || 'BwHsNp2ijQiXMWCYS';

    const templateParams = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      full_name: `${formData.firstName} ${formData.lastName}`,
      from_name: `${formData.firstName} ${formData.lastName}`,

      user_email: formData.email,
      from_email: formData.email,
      email: formData.email,
      reply_to: formData.email,

      company_name: formData.companyName,
      user_phone: phone,
      phone: phone,

      street_address: formData.streetAddress,
      apartment: formData.apartment || 'N/A',
      city: formData.city,
      state: formData.state,
      zip_code: formData.zipCode,
      full_address: `${formData.streetAddress}${formData.apartment ? ', ' + formData.apartment : ''}, ${formData.city}, ${formData.state} ${formData.zipCode}`,

      tax_id: formData.taxId,
      tax_id_file: fileName || 'No file attached',
      how_found: formData.howFound,
    };

    import('@emailjs/browser').then((emailjs) => {
      emailjs.default
        .send(serviceID, templateID, templateParams, publicKey)
        .then(
          (response) => {
            setLoading(false);
            console.log('EmailJS Success:', response.status, response.text);
            setStatus({
              type: 'success',
              message: 'Thank you for your application! Our team will review your details and contact you within 2-3 business days.',
            });
            setFormData({
              firstName: '', lastName: '', email: '', companyName: '',
              streetAddress: '', apartment: '', state: '', city: '',
              zipCode: '', taxId: '', howFound: '',
            });
            setPhone('');
            setFileName('');
            if (fileInputRef.current) fileInputRef.current.value = '';
          },
          (error) => {
            setLoading(false);
            console.error('EmailJS Error Details:', error);
            const errorMsg = error?.text || error?.message || 'Check EmailJS Keys & Template settings';
            setStatus({
              type: 'error',
              message: `EmailJS Error: ${errorMsg}. Please verify your Service ID, Template ID & Public Key.`,
            });
          }
        );
    });
  };

  const cities = formData.state ? (STATE_CITIES[formData.state] || []) : [];

  return (
    <>
      <Navbar />

      <main className="dist-signup-page">
        {/* Header */}
        <section className="dist-header">
          <div className="container">
            <span className="eyebrow">Partner With Us</span>
            <h1 className="dist-title">Sign Up as a Distributor</h1>
            <p className="dist-subtitle">
              Join hundreds of retailers who trust Assemble Distribution. Fill out the form below and our team will review your application.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="dist-form-section container">
          <div className="dist-form-card">

            {status.message && (
              <div className={`status-alert status-alert--${status.type}`}>
                {status.type === 'success' ? (
                  <CheckCircle size={20} className="status-icon" />
                ) : (
                  <AlertCircle size={20} className="status-icon" />
                )}
                <span>{status.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="dist-form">

              {/* Personal Information */}
              <div className="dist-form__section-title">Personal Information</div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dist-firstName">First Name <span className="req">*</span></label>
                  <input
                    type="text" id="dist-firstName" name="firstName"
                    value={formData.firstName} onChange={handleChange}
                    placeholder="e.g. John" required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dist-lastName">Last Name <span className="req">*</span></label>
                  <input
                    type="text" id="dist-lastName" name="lastName"
                    value={formData.lastName} onChange={handleChange}
                    placeholder="e.g. Doe" required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dist-email">Email Address <span className="req">*</span></label>
                  <input
                    type="email" id="dist-email" name="email"
                    value={formData.email} onChange={handleChange}
                    placeholder="john@company.com" required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="dist-companyName">Company Name <span className="req">*</span></label>
                  <input
                    type="text" id="dist-companyName" name="companyName"
                    value={formData.companyName} onChange={handleChange}
                    placeholder="Your Company LLC" required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="dist-phone">Phone Number</label>
                <div className="international-phone-container">
                  <PhoneInput
                    defaultCountry="us"
                    value={phone}
                    onChange={(val) => setPhone(val)}
                    className="custom-phone-input"
                    inputProps={{
                      id: 'dist-phone',
                      placeholder: 'Enter phone number'
                    }}
                  />
                </div>
              </div>

              {/* Address */}
              <div className="dist-form__section-title">Address</div>

              <div className="form-group">
                <label htmlFor="dist-street">Street Address <span className="req">*</span></label>
                <input
                  type="text" id="dist-street" name="streetAddress"
                  value={formData.streetAddress} onChange={handleChange}
                  placeholder="House number and street name" required
                />
              </div>

              <div className="form-group">
                <label htmlFor="dist-apartment">Apartment, suite, unit, etc.</label>
                <input
                  type="text" id="dist-apartment" name="apartment"
                  value={formData.apartment} onChange={handleChange}
                  placeholder="Apartment, suite, unit, etc. (optional)"
                />
              </div>

              <div className="form-row form-row--3">
                <div className="form-group">
                  <label htmlFor="dist-state">State <span className="req">*</span></label>
                  <select
                    id="dist-state" name="state"
                    value={formData.state} onChange={handleChange} required
                  >
                    {US_STATES.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dist-city">Town / City <span className="req">*</span></label>
                  <select
                    id="dist-city" name="city"
                    value={formData.city} onChange={handleChange} required
                    disabled={!formData.state}
                  >
                    <option value="">
                      {formData.state ? 'Select City' : 'Select State first'}
                    </option>
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="dist-zip">ZIP Code <span className="req">*</span></label>
                  <input
                    type="text" id="dist-zip" name="zipCode"
                    value={formData.zipCode} onChange={handleChange}
                    placeholder="e.g. 75001" required
                    pattern="[0-9]{5}(-[0-9]{4})?"
                    title="Enter a valid 5-digit ZIP code"
                  />
                </div>
              </div>

              {/* Tax & Verification */}
              <div className="dist-form__section-title">Tax &amp; Verification</div>

              <div className="form-group">
                <label htmlFor="dist-taxId">Tax ID <span className="req">*</span></label>
                <input
                  type="text" id="dist-taxId" name="taxId"
                  value={formData.taxId} onChange={handleChange}
                  placeholder="e.g. 12-3456789" required
                />
              </div>

              <div className="form-group">
                <label>Tax ID Form Upload <span className="req">*</span></label>
                <div
                  className={`file-upload-zone ${fileName ? 'file-upload-zone--has-file' : ''}`}
                  onClick={() => !fileName && fileInputRef.current?.click()}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                    onChange={handleFileChange}
                    className="file-input-hidden"
                    required={!fileName}
                  />
                  {fileName ? (
                    <div className="file-upload-preview">
                      <FileText size={20} />
                      <span className="file-name">{fileName}</span>
                      <button type="button" className="file-remove-btn" onClick={(e) => { e.stopPropagation(); removeFile(); }}>
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="file-upload-placeholder">
                      <Upload size={24} />
                      <span>Click to upload or drag &amp; drop</span>
                      <span className="file-hint">PDF, JPG, PNG, DOC (Max 10MB)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* How Found */}
              <div className="dist-form__section-title">Additional Information</div>

              <div className="form-group">
                <label htmlFor="dist-howFound">How did you find us? <span className="req">*</span></label>
                <select
                  id="dist-howFound" name="howFound"
                  value={formData.howFound} onChange={handleChange} required
                >
                  {HOW_FOUND_OPTIONS.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn--solid submit-btn"
                id="dist-submit-btn"
              >
                {loading ? (
                  <>
                    <Loader2 size={18} className="spinner" /> Processing Application...
                  </>
                ) : (
                  <>
                    Submit Application <Send size={16} />
                  </>
                )}
              </button>

            </form>
          </div>
        </section>
      </main>

      <Footer />

      <style dangerouslySetInnerHTML={{
        __html: `
        .dist-signup-page {
          background-color: var(--bg-neutral);
          min-height: 100vh;
          padding-bottom: 80px;
        }

        .dist-header {
          padding: 80px 0 60px;
          text-align: center;
          background: #fff;
          border-bottom: 1px solid var(--line);
        }

        .dist-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 700;
          color: var(--ink);
          margin-bottom: 16px;
          letter-spacing: -0.5px;
        }

        .dist-subtitle {
          font-size: 16px;
          color: var(--gray);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .dist-form-section {
          margin-top: -20px;
          padding-bottom: 60px;
        }

        .dist-form-card {
          background: #fff;
          border-radius: var(--radius-lg);
          border: 1px solid var(--line);
          box-shadow: 0 10px 40px rgba(0,0,0,0.04);
          padding: 48px 52px;
          max-width: 820px;
          margin: 0 auto;
        }

        .dist-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .dist-form__section-title {
          font-size: 16px;
          font-weight: 700;
          color: var(--teal);
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 12px;
          margin-bottom: -4px;
          padding-bottom: 8px;
          border-bottom: 2px solid rgba(28, 92, 83, 0.12);
        }

        .req {
          color: #e53e3e;
        }

        /* ── Form rows ── */
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .form-row--3 {
          grid-template-columns: 1fr 1fr 1fr;
        }

        /* ── Labels & Inputs ── */
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-group label {
          font-size: 13px;
          font-weight: 600;
          color: var(--ink);
        }

        .form-group input,
        .form-group select,
        .form-group textarea {
          width: 100%;
          padding: 12px 16px;
          background: var(--bg-neutral);
          border: 1.5px solid var(--line);
          border-radius: var(--radius-sm);
          font-family: var(--font);
          font-size: 14px;
          color: var(--ink);
          outline: none;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
          appearance: none;
          -webkit-appearance: none;
        }

        .form-group select {
          background-image: url("data:image/svg+xml,%3Csvg width='12' height='8' viewBox='0 0 12 8' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1.5L6 6.5L11 1.5' stroke='%236B6F6E' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 14px center;
          padding-right: 40px;
          cursor: pointer;
        }

        .form-group select:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .form-group input:focus,
        .form-group select:focus,
        .form-group textarea:focus {
          border-color: var(--teal);
          background: #fff;
          box-shadow: 0 0 0 3px rgba(28, 92, 83, 0.1);
        }

        /* ── File Upload ── */
        .file-input-hidden {
          position: absolute;
          width: 0;
          height: 0;
          opacity: 0;
          pointer-events: none;
        }

        .file-upload-zone {
          border: 2px dashed var(--line);
          border-radius: var(--radius-md);
          padding: 28px 20px;
          text-align: center;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
          position: relative;
        }

        .file-upload-zone:hover {
          border-color: var(--teal);
          background: rgba(28, 92, 83, 0.03);
        }

        .file-upload-zone--has-file {
          border-style: solid;
          border-color: var(--teal);
          background: rgba(28, 92, 83, 0.04);
          cursor: default;
        }

        .file-upload-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          color: var(--gray);
          font-size: 14px;
        }

        .file-upload-placeholder svg {
          color: var(--teal);
        }

        .file-hint {
          font-size: 12px;
          color: rgba(107, 111, 110, 0.7);
        }

        .file-upload-preview {
          display: flex;
          align-items: center;
          gap: 10px;
          justify-content: center;
          color: var(--teal);
          font-size: 14px;
          font-weight: 500;
        }

        .file-name {
          max-width: 250px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .file-remove-btn {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(229, 62, 62, 0.1);
          color: #e53e3e;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background 0.2s;
          border: none;
          flex-shrink: 0;
        }

        .file-remove-btn:hover {
          background: rgba(229, 62, 62, 0.2);
        }

        /* ── Phone input overrides ── */
        .international-phone-container {
          width: 100%;
        }

        .custom-phone-input {
          display: flex !important;
          width: 100% !important;
        }

        .custom-phone-input .react-international-phone-country-selector-button {
          height: 47px !important;
          background: var(--bg-neutral) !important;
          border: 1.5px solid var(--line) !important;
          border-right: none !important;
          border-radius: var(--radius-sm) 0 0 var(--radius-sm) !important;
          padding: 0 12px !important;
          transition: border-color 0.2s, background 0.2s !important;
        }

        .custom-phone-input .react-international-phone-input {
          height: 47px !important;
          width: 100% !important;
          background: var(--bg-neutral) !important;
          border: 1.5px solid var(--line) !important;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0 !important;
          padding: 12px 16px !important;
          font-family: var(--font) !important;
          font-size: 14px !important;
          color: var(--ink) !important;
          outline: none !important;
          transition: border-color 0.2s, background 0.2s, box-shadow 0.2s !important;
        }

        .custom-phone-input:focus-within .react-international-phone-country-selector-button,
        .custom-phone-input:focus-within .react-international-phone-input {
          border-color: var(--teal) !important;
          background: #ffffff !important;
        }

        .custom-phone-input:focus-within .react-international-phone-input {
          box-shadow: 0 0 0 3px rgba(28, 92, 83, 0.1) !important;
        }

        /* ── Status alerts ── */
        .status-alert {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 18px;
          border-radius: var(--radius-md);
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 10px;
        }

        .status-alert--success {
          background-color: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .status-alert--error {
          background-color: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        .status-icon {
          flex-shrink: 0;
        }

        /* ── Submit Button ── */
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px 28px;
          font-size: 15px;
          font-weight: 600;
          margin-top: 16px;
          border-radius: var(--radius-pill);
          background: var(--teal);
          color: #ffffff;
          border: none;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }

        .submit-btn:hover {
          background: var(--teal-dark);
          transform: translateY(-1px);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        .spinner {
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .dist-header {
            padding: 60px 0 40px;
          }

          .dist-form-card {
            padding: 28px 20px;
            border-radius: var(--radius-md);
          }

          .dist-form-section {
            margin-top: 10px;
          }

          .form-row,
          .form-row--3 {
            grid-template-columns: 1fr;
          }

          .dist-form__section-title {
            font-size: 14px;
          }

          .file-upload-zone {
            padding: 22px 16px;
          }
        }

        @media (max-width: 480px) {
          .dist-header {
            padding: 40px 0 28px;
          }
          .dist-title {
            font-size: 24px;
          }
          .dist-subtitle {
            font-size: 14px;
          }
          .dist-form-card {
            padding: 22px 16px;
          }
        }
      `}} />
    </>
  );
}
