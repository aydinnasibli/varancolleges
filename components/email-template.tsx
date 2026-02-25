import * as React from 'react';

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  name,
  email,
  phone,
  message,
}) => (
  <div style={{ fontFamily: 'sans-serif', lineHeight: '1.6', color: '#333' }}>
    <h2 style={{ color: '#0f2142', borderBottom: '2px solid #d4af37', paddingBottom: '10px' }}>
      Yeni Müraciət
    </h2>
    <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
      <p style={{ margin: '10px 0' }}><strong>Ad və Soyad:</strong> {name}</p>
      <p style={{ margin: '10px 0' }}><strong>Email:</strong> {email}</p>
      <p style={{ margin: '10px 0' }}><strong>Telefon:</strong> {phone}</p>

      <div style={{ marginTop: '20px' }}>
        <strong>Mesaj:</strong>
        <p style={{
          marginTop: '5px',
          whiteSpace: 'pre-wrap',
          backgroundColor: '#fff',
          padding: '15px',
          border: '1px solid #ddd',
          borderRadius: '4px'
        }}>
          {message || 'Mesaj yoxdur'}
        </p>
      </div>
    </div>
    <div style={{ marginTop: '20px', fontSize: '12px', color: '#888', textAlign: 'center' }}>
      <p>Bu mesaj VaranColleges veb saytından göndərilmişdir.</p>
    </div>
  </div>
);
