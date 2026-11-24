import React, { useState, useEffect, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';

// Asl rasmdagi asosiy davlatlar va boshqa davlatlar uchun zaxira ma'lumotlar
const initialCountries = [
  {
    name: 'Germany',
    population: 81770900,
    region: 'Europe',
    capital: 'Berlin',
    flag: 'https://flagcdn.com/w320/de.png',
  },
  {
    name: 'United States of America',
    population: 323947000,
    region: 'Americas',
    capital: 'Washington, D.C.',
    flag: 'https://flagcdn.com/w320/us.png',
  },
  {
    name: 'Brazil',
    population: 206135893,
    region: 'Americas',
    capital: 'Brasília',
    flag: 'https://flagcdn.com/w320/br.png',
  },
  {
    name: 'Iceland',
    population: 334300,
    region: 'Europe',
    capital: 'Reykjavík',
    flag: 'https://flagcdn.com/w320/is.png',
  },
  {
    name: 'Afghanistan',
    population: 27657145,
    region: 'Asia',
    capital: 'Kabul',
    flag: 'https://flagcdn.com/w320/af.png',
  },
  {
    name: 'Åland Islands',
    population: 28875,
    region: 'Europe',
    capital: 'Mariehamn',
    flag: 'https://flagcdn.com/w320/ax.png',
  },
  {
    name: 'Albania',
    population: 2886026,
    region: 'Europe',
    capital: 'Tirana',
    flag: 'https://flagcdn.com/w320/al.png',
  },
  {
    name: 'Algeria',
    population: 40400000,
    region: 'Africa',
    capital: 'Algiers',
    flag: 'https://flagcdn.com/w320/dz.png',
  },
  {
    name: 'Uzbekistan',
    population: 36000000,
    region: 'Asia',
    capital: 'Tashkent',
    flag: 'https://flagcdn.com/w320/uz.png',
  },
  {
    name: 'Australia',
    population: 25687041,
    region: 'Oceania',
    capital: 'Canberra',
    flag: 'https://flagcdn.com/w320/au.png',
  },
  {
    name: 'Japan',
    population: 125800000,
    region: 'Asia',
    capital: 'Tokyo',
    flag: 'https://flagcdn.com/w320/jp.png',
  },
  {
    name: 'Canada',
    population: 38005238,
    region: 'Americas',
    capital: 'Ottawa',
    flag: 'https://flagcdn.com/w320/ca.png',
  },
];

function Main() {
  const { theme } = useContext(ThemeContext);
  const isDark = theme === 'dark';

  const [countries, setCountries] = useState(initialCountries);
  const [search, setSearch] = useState('');
  const [region, setRegion] = useState('');
  const [loading, setLoading] = useState(false);

  // REST Countries API dan yuklash (mavjud bo'lsa)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital')
      .then((res) => {
        if (!res.ok) throw new Error('Network error');
        return res.json();
      })
      .then((data) => {
        if (!isMounted || !Array.isArray(data) || data.length === 0) return;
        const formatted = data.map((c) => ({
          name: c.name?.common || c.name,
          population: c.population || 0,
          region: c.region || 'Unknown',
          capital: Array.isArray(c.capital) ? c.capital[0] : c.capital || 'N/A',
          flag: c.flags?.png || c.flags?.svg || '',
        }));
        setCountries(formatted);
      })
      .catch(() => {
        // Tarmoq xatosi bo'lsa dastlabki (rasmdagi) ro'yxat saqlanadi
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Qidiruv va Filter
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name
      .toLowerCase()
      .includes(search.toLowerCase().trim());
    const matchesRegion = region === '' || country.region.toLowerCase() === region.toLowerCase();
    return matchesSearch && matchesRegion;
  });

  return (
    <main
      style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '40px 20px 60px',
        minHeight: 'calc(100vh - 160px)',
      }}
    >
      {/* Search va Filter qatori */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
          marginBottom: '45px',
        }}
      >
        {/* Qidiruv maydoni */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '460px',
            backgroundColor: isDark ? '#2b3743' : '#ffffff',
            borderRadius: '6px',
            boxShadow: isDark
              ? '0 2px 8px rgba(0, 0, 0, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.06)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 24px',
            transition: 'background-color 0.3s ease',
          }}
        >
          <span
            style={{
              fontSize: '18px',
              color: isDark ? '#c4c4c4' : '#858585',
              marginRight: '14px',
            }}
          >
            🔍
          </span>
          <input
            type="text"
            placeholder="Search for a country..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 0',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: isDark ? '#ffffff' : '#111517',
              fontSize: '14px',
              fontWeight: 500,
            }}
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              style={{
                background: 'transparent',
                border: 'none',
                color: isDark ? '#aaa' : '#888',
                cursor: 'pointer',
                fontSize: '16px',
                padding: '4px',
              }}
              title="Tozalash"
            >
              ✕
            </button>
          )}
        </div>

        {/* Region Filter */}
        <div
          style={{
            position: 'relative',
            width: '200px',
            backgroundColor: isDark ? '#2b3743' : '#ffffff',
            borderRadius: '6px',
            boxShadow: isDark
              ? '0 2px 8px rgba(0, 0, 0, 0.3)'
              : '0 2px 8px rgba(0, 0, 0, 0.06)',
            transition: 'background-color 0.3s ease',
          }}
        >
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={{
              width: '100%',
              padding: '16px 20px',
              border: 'none',
              outline: 'none',
              background: 'transparent',
              color: isDark ? '#ffffff' : '#111517',
              fontSize: '14px',
              fontWeight: 600,
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='${
                isDark ? '%23ffffff' : '%23111517'
              }' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 16px center',
              backgroundSize: '14px',
            }}
          >
            <option value="" style={{ background: isDark ? '#2b3743' : '#fff' }}>
              Filter by Region
            </option>
            <option value="Africa" style={{ background: isDark ? '#2b3743' : '#fff' }}>
              Africa
            </option>
            <option value="Americas" style={{ background: isDark ? '#2b3743' : '#fff' }}>
              America
            </option>
            <option value="Asia" style={{ background: isDark ? '#2b3743' : '#fff' }}>
              Asia
            </option>
            <option value="Europe" style={{ background: isDark ? '#2b3743' : '#fff' }}>
              Europe
            </option>
            <option value="Oceania" style={{ background: isDark ? '#2b3743' : '#fff' }}>
              Oceania
            </option>
          </select>
        </div>
      </div>

      {/* Davlatlar Grid Kartalari */}
      {filteredCountries.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: isDark ? '#ccc' : '#777' }}>
          <h3>Hech qanday davlat topilmadi!</h3>
          <p style={{ marginTop: '8px' }}>Qidiruv so'zini yoki regionni o'zgartirib ko'ring.</p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '40px',
          }}
        >
          {filteredCountries.map((country, idx) => (
            <div
              key={country.name + idx}
              style={{
                backgroundColor: isDark ? '#2b3743' : '#ffffff',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: isDark
                  ? '0 3px 12px rgba(0, 0, 0, 0.4)'
                  : '0 3px 12px rgba(0, 0, 0, 0.06)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, background-color 0.3s ease',
                cursor: 'pointer',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.boxShadow = isDark
                  ? '0 8px 20px rgba(0, 0, 0, 0.6)'
                  : '0 8px 20px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = isDark
                  ? '0 3px 12px rgba(0, 0, 0, 0.4)'
                  : '0 3px 12px rgba(0, 0, 0, 0.06)';
              }}
            >
              {/* Bayroq */}
              <div
                style={{
                  width: '100%',
                  height: '160px',
                  backgroundColor: isDark ? '#202c37' : '#e0e0e0',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={country.flag}
                  alt={`${country.name} flag`}
                  loading="lazy"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

              {/* Ma'lumotlar */}
              <div style={{ padding: '24px 24px 30px' }}>
                <h3
                  style={{
                    margin: '0 0 16px 0',
                    fontSize: '18px',
                    fontWeight: 800,
                    color: isDark ? '#ffffff' : '#111517',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                  title={country.name}
                >
                  {country.name}
                </h3>
                <p
                  style={{
                    margin: '6px 0',
                    fontSize: '14px',
                    color: isDark ? '#e0e0e0' : '#333333',
                  }}
                >
                  <strong style={{ fontWeight: 600, color: isDark ? '#ffffff' : '#111517' }}>
                    Population:
                  </strong>{' '}
                  {Number(country.population).toLocaleString()}
                </p>
                <p
                  style={{
                    margin: '6px 0',
                    fontSize: '14px',
                    color: isDark ? '#e0e0e0' : '#333333',
                  }}
                >
                  <strong style={{ fontWeight: 600, color: isDark ? '#ffffff' : '#111517' }}>
                    Region:
                  </strong>{' '}
                  {country.region}
                </p>
                <p
                  style={{
                    margin: '6px 0',
                    fontSize: '14px',
                    color: isDark ? '#e0e0e0' : '#333333',
                  }}
                >
                  <strong style={{ fontWeight: 600, color: isDark ? '#ffffff' : '#111517' }}>
                    Capital:
                  </strong>{' '}
                  {country.capital}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default Main;
