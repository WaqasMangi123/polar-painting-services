import React, { useState } from 'react';
import './costestimator.css';
import { jsPDF } from 'jspdf';
import { Link } from 'react-router-dom';

const CostEstimator = () => {
  const [projectType, setProjectType] = useState('');
  const [numFloors, setNumFloors] = useState(1);
  const [numRooms, setNumRooms] = useState(1);
  const [floorsData, setFloorsData] = useState([{ sqft: '', ceilingHeight: '' }]);  // State for floors
  const [roomsData, setRoomsData] = useState([{ sqft: '', ceilingHeight: '' }]);    // State for rooms
  const [estimate, setEstimate] = useState(0);
  const [detailedBreakdown, setDetailedBreakdown] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes for floors or rooms
  const handleInputChange = (e, index, type) => {
    const { name, value } = e.target;

    // Clone the existing data for floors or rooms
    const updatedData = type === 'floor' ? [...floorsData] : [...roomsData];

    // Update the specific floor or room without affecting others
    updatedData[index][name] = value === '' ? '' : parseFloat(value) || 0;

    // Set the updated data for floors or rooms
    if (type === 'floor') setFloorsData(updatedData);
    else setRoomsData(updatedData);
  };

  // Handle number of floors or rooms change
  const handleNumberChange = (e) => {
    const { value } = e.target;
    const newNumber = parseInt(value) || 1;

    if (projectType === 'wholeHouse') {
      setNumFloors(newNumber);
      setFloorsData(new Array(newNumber).fill({ sqft: '', ceilingHeight: '' }));
    } else {
      setNumRooms(newNumber);
      setRoomsData(new Array(newNumber).fill({ sqft: '', ceilingHeight: '' }));
    }
  };

  // Validate inputs
  const validateInputs = (data) => {
    for (const entry of data) {
      if (!entry.sqft || entry.sqft <= 0 || !entry.ceilingHeight || entry.ceilingHeight <= 0) {
        setErrorMessage('Please enter valid values for Square Feet and Ceiling Height (greater than 0).');
        return false;
      }
    }
    setErrorMessage('');
    return true;
  };

  // Generate estimate
  const generateEstimate = () => {
    const data = projectType === 'wholeHouse' ? floorsData : roomsData;
    if (!validateInputs(data)) return;

    let totalEstimate = 0;
    const breakdown = [];
    data.forEach((item, index) => {
      const estimateValue = 9 * (Math.sqrt(item.sqft) * item.ceilingHeight);
      totalEstimate += estimateValue;
      breakdown.push({
        index: index + 1,
        sqft: item.sqft,
        ceilingHeight: item.ceilingHeight,
        calcValue: estimateValue,
      });
    });

    setEstimate(totalEstimate);
    setDetailedBreakdown(breakdown);
  };

  // Generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.addImage(`${window.location.origin}/logo2.png`, 'PNG', 10, 10, 50, 50);
    doc.setFontSize(20);
    doc.text('Polar Painting Services', 70, 25);
    doc.setFontSize(12);
    doc.text('Construction Cost Estimate Report', 70, 35);
    doc.setFontSize(14);
    doc.text('Project Summary:', 20, 70);
    doc.setFontSize(12);
    doc.text(`Project Type: ${projectType === 'wholeHouse' ? 'Whole House' : 'Specific Room(s)'}`, 20, 80);
    doc.text(`Total Estimated Cost: $${estimate.toFixed(2)}`, 20, 90);
    doc.setFontSize(14);
    doc.text('Detailed Breakdown:', 20, 110);

    detailedBreakdown.forEach((item, index) => {
      const y = 120 + index * 30;
      doc.setFontSize(12);
      doc.text(`Floor/Room ${item.index}:`, 20, y);
      doc.setTextColor('#555');
      doc.text(`- Square Feet: ${item.sqft}`, 30, y + 10);
      doc.text(`- Ceiling Height: ${item.ceilingHeight} ft`, 30, y + 20);
      doc.text(`- Estimated Cost: $${item.calcValue.toFixed(2)}`, 30, y + 30);
    });

    doc.setFontSize(10);
    doc.setTextColor('#777');
    doc.text('Contact Information: (416) 238-7373', 20, 270);
    doc.save('Construction_Cost_Estimate_Report.pdf');
  };

  return (
    <div className="cost-estimator">
      <section className="hero-section">
        <div className="hero-content">
          <h1>Project Cost Estimator</h1>
          <p>Easily estimate your construction costs with precision and accuracy.</p>
          <button className="cta-button" onClick={() => window.scrollTo({ top: 800, behavior: 'smooth' })}>
            Get Started
          </button>
        </div>
      </section>

      <section className="form-section">
        <div className="form-container">
          <div className="form-box">
            <h2 className="step-header">Step 1: Choose Project Type</h2>
            <div className="project-type-selection">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={projectType === 'wholeHouse'}
                  onChange={() => setProjectType('wholeHouse')}
                />
                Whole House
              </label>
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  checked={projectType === 'specificRooms'}
                  onChange={() => setProjectType('specificRooms')}
                />
                Specific Room(s)
              </label>
            </div>

            {projectType && (
              <>
                <h2 className="step-header">Step 2: Number of Floors/Rooms</h2>
                <div className="input-wrapper">
                  <input
                    type="number"
                    min="1"
                    value={projectType === 'wholeHouse' ? numFloors : numRooms}
                    onChange={handleNumberChange}
                    placeholder={`Enter number of ${projectType === 'wholeHouse' ? 'floors' : 'rooms'}`}
                    className="input-field"
                  />
                </div>
              </>
            )}

            <h2 className="step-header">Step 3: Enter Details</h2>
            {(projectType === 'wholeHouse' ? floorsData : roomsData).map((item, index) => (
              <div key={index} className="data-input">
                <h3>{projectType === 'wholeHouse' ? `Floor ${index + 1}` : `Room ${index + 1}`}</h3>
                <label className="input-label">
                  Square Feet:
                  <input
                    type="number"
                    name="sqft"
                    value={item.sqft || ''}
                    onChange={(e) => handleInputChange(e, index, projectType === 'wholeHouse' ? 'floor' : 'room')}
                    className="input-field"
                  />
                </label>
                <label className="input-label">
                  Ceiling Height (ft):
                  <input
                    type="number"
                    name="ceilingHeight"
                    value={item.ceilingHeight || ''}
                    onChange={(e) => handleInputChange(e, index, projectType === 'wholeHouse' ? 'floor' : 'room')}
                    className="input-field"
                  />
                </label>
              </div>
            ))}

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <button className="cta-button" onClick={generateEstimate}>
              Calculate Estimate
            </button>

            {estimate > 0 && (
              <div className="estimate-result">
                <h3>Total Estimate: ${estimate.toFixed(2)}</h3>
                <button className="cta-button" onClick={generatePDF}>Download PDF</button>
              </div>
            )}
          </div>

          <div className="contact-us">
            <h3>Need help? <Link to="/contact">Contact Us</Link></h3>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CostEstimator;
