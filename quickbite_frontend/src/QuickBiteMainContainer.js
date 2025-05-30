import React, { useState } from 'react';

/**
 * Main Container for QuickBite Campus web app.
 * Card-based layout, horizontal tab navigation, search, build-a-recipe wizard.
 * Theme: light, primary color: #FFC107 (yellow), accent: #FF7043.
 */

// Dummy recipe data for demonstration (NO IMAGES)
const DEMO_RECIPES = [
  {
    id: 1,
    title: "Avocado Toast Deluxe",
    ingredients: 5,
    tags: ["vegan", "quick"],
  },
  {
    id: 2,
    title: "One-Pan Spicy Pasta",
    ingredients: 4,
    tags: ["student", "gluten-free"],
  },
  {
    id: 3,
    title: "Smashed Chickpea Salad",
    ingredients: 5,
    tags: ["vegan", "protein-packed"],
  },
  {
    id: 4,
    title: "Egg Fried Rice",
    ingredients: 5,
    tags: ["student", "budget"],
  },
  {
    id: 5,
    title: "Tofu Stir-fry",
    ingredients: 4,
    tags: ["vegan", "gluten-free"],
  },
];

// Section definitions
const SECTIONS = [
  { key: '5ingredient', label: '5-Ingredient Recipes', desc: 'Simple recipes with no more than 5 ingredients.' },
  { key: 'student', label: 'Student Meals', desc: 'Budget meals for students.' },
  { key: 'vegan', label: 'Vegan & Plant-Based Galaxy', desc: 'Plant-based recipes sorted by protein.' },
  { key: 'build', label: 'Build-a-Recipe', desc: 'Create a recipe using available ingredients.' },
];

// PUBLIC_INTERFACE
function QuickBiteMainContainer() {
  const [activeSection, setActiveSection] = useState('5ingredient');
  const [searchValue, setSearchValue] = useState('');
  const [buildStep, setBuildStep] = useState(0);
  const [buildData, setBuildData] = useState({
    base: '',
    protein: '',
    veggies: [],
    sauce: '',
    summary: {}
  });

  // Filtering logic for recipes based on section and search
  const filteredRecipes = DEMO_RECIPES.filter((recipe) => {
    const titleMatch = recipe.title.toLowerCase().includes(searchValue.toLowerCase());
    if (activeSection === "5ingredient") {
      return recipe.ingredients <= 5 && titleMatch;
    }
    if (activeSection === "student") {
      return recipe.tags.includes("student") && titleMatch;
    }
    if (activeSection === "vegan") {
      return recipe.tags.includes("vegan") && titleMatch;
    }
    return false;
  });

  // Step-by-step wizard for build-a-recipe
  const buildSteps = [
    {
      label: "Choose Your Base",
      content: (
        <div>
          <div className="qbc-wizard-options">
            {['Pasta', 'Rice', 'Bread', 'Tortilla'].map(opt => (
              <button
                key={opt}
                className={`qbc-btn-wizard ${buildData.base === opt ? 'selected' : ''}`}
                onClick={() => setBuildData({...buildData, base: opt})}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      label: "Pick a Protein",
      content: (
        <div>
          <div className="qbc-wizard-options">
            {['Eggs', 'Chickpeas', 'Tofu', 'Chicken', 'Beans'].map(opt => (
              <button
                key={opt}
                className={`qbc-btn-wizard ${buildData.protein === opt ? 'selected' : ''}`}
                onClick={() => setBuildData({...buildData, protein: opt})}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      label: "Add Veggies (optional)",
      content: (
        <div>
          <div className="qbc-wizard-options">
            {['Spinach', 'Peppers', 'Broccoli', 'Tomato', 'Corn'].map(opt => (
              <button
                key={opt}
                className={`qbc-btn-wizard ${buildData.veggies.includes(opt) ? 'selected' : ''}`}
                onClick={() => setBuildData((prev) => ({
                  ...prev,
                  veggies: prev.veggies.includes(opt)
                    ? prev.veggies.filter(v => v !== opt)
                    : [...prev.veggies, opt]
                }))}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      label: "Choose a Sauce (optional)",
      content: (
        <div>
          <div className="qbc-wizard-options">
            {['Marinara', 'Soy Sauce', 'Pesto', 'Cheese', 'Salsa'].map(opt => (
              <button
                key={opt}
                className={`qbc-btn-wizard ${buildData.sauce === opt ? 'selected' : ''}`}
                onClick={() => setBuildData({...buildData, sauce: opt})}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      label: "Summary",
      content: (
        <div className="qbc-summary">
          <h4>Your Custom Recipe:</h4>
          <ul className="qbc-summary-list">
            <li><b>Base:</b> {buildData.base || <span className="dimmed">Not selected</span>}</li>
            <li><b>Protein:</b> {buildData.protein || <span className="dimmed">Not selected</span>}</li>
            <li><b>Veggies:</b> {buildData.veggies.length > 0 ? buildData.veggies.join(", ") : <span className="dimmed">None</span>}</li>
            <li><b>Sauce:</b> {buildData.sauce ? buildData.sauce : <span className="dimmed">None</span>}</li>
          </ul>
          <div style={{marginTop: 20}}>
            <span role="img" aria-label="chef" style={{fontSize: '2rem'}}>👩‍🍳</span> Enjoy your creation!
          </div>
        </div>
      )
    }
  ];

  // Handlers for build wizard
  function nextBuildStep() { setBuildStep(s => Math.min(s + 1, buildSteps.length - 1)); }
  function prevBuildStep() { setBuildStep(s => Math.max(s - 1, 0)); }
  function resetBuildRecipe() {
    setBuildStep(0);
    setBuildData({ base: '', protein: '', veggies: [], sauce: '', summary: {} });
  }

  // Main render
  return (
    <div className="qbc-root">
      {/* Horizontal navbar with tabs */}
      <nav className="qbc-navbar">
        <div className="qbc-logo">Bachelors Cooking</div>
        <div className="qbc-nav-tabs">
          {SECTIONS.map(section =>
            <button
              key={section.key}
              onClick={() => {
                setActiveSection(section.key);
                if (section.key === 'build') resetBuildRecipe();
              }}
              className={`qbc-nav-tab${activeSection === section.key ? ' active' : ''}`}
              type="button"
            >
              {section.label}
            </button>
          )}
        </div>
        <div className="qbc-tagline">Fast. Fresh. Student-Friendly.</div>
      </nav>
      <div className="qbc-main-layout">
        {/* Main content (no left-hand sidebar) */}
        <section className="qbc-content">
          {/* Search bar for recipes sections only */}
          {activeSection !== 'build' && (
            <div className="qbc-searchbar-container">
              <input
                className="qbc-searchbar"
                type="search"
                value={searchValue}
                onChange={e => setSearchValue(e.target.value)}
                placeholder="🔍 Search recipes by name..."
                aria-label="Search recipes"
              />
            </div>
          )}

          {/* Section content */}
          {activeSection !== 'build' && (
            <>
              <h2 className="qbc-section-title">{SECTIONS.find(s => s.key === activeSection).label}</h2>
              <div className="qbc-section-desc">{SECTIONS.find(s => s.key === activeSection).desc}</div>
              <div className="qbc-card-list">
                {filteredRecipes.length === 0 && (
                  <div className="qbc-empty">No recipes found. Try a different search.</div>
                )}
                {filteredRecipes.map(recipe =>
                  <RecipeCard key={recipe.id} {...recipe} />
                )}
              </div>
            </>
          )}
          {activeSection === 'build' && (
            <div className="qbc-wizard">
              <h2 className="qbc-section-title">Build-a-Recipe</h2>
              <div className="qbc-section-desc">Create a custom recipe in just a few steps!</div>
              <div className="qbc-wizard-step-indicator">{buildStep + 1} / {buildSteps.length}: <span style={{color: '#FFC107', fontWeight: 600}}>{buildSteps[buildStep].label}</span></div>
              <div className="qbc-wizard-step-content">
                {buildSteps[buildStep].content}
              </div>
              <div className="qbc-wizard-actions">
                <button className="qbc-btn-accent"
                  onClick={prevBuildStep} disabled={buildStep === 0} type="button">
                  Previous
                </button>
                {buildStep < buildSteps.length - 1 ? (
                  <button className="qbc-btn-primary"
                    onClick={nextBuildStep}
                    type="button"
                  >
                    Next
                  </button>
                ) : (
                  <button className="qbc-btn-secondary" onClick={resetBuildRecipe} type="button">
                    Start Over
                  </button>
                )}
              </div>
            </div>
          )}
        </section>
      </div>
      <footer className="qbc-footer">
        <span>Bachelors Cooking &copy; {new Date().getFullYear()} &mdash; Eat smart, live well.</span>
      </footer>

      {/* Inline CSS for this component */}
      <style>{`
        .qbc-root {
          min-height: 100vh;
          background: #f9f9f9;
          color: #212121;
          font-family: 'Inter','Roboto',sans-serif;
          display: flex;
          flex-direction: column;
        }
        .qbc-navbar {
          background: #FFC107;
          color: #222;
          padding: 0 0 0 0;
          font-size: 1.18rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: space-between;
          letter-spacing: 0.02em;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          position: sticky;
          top: 0;
          z-index: 99;
          height: 74px;
        }
        .qbc-logo {
          margin-left: 24px;
          font-size: 1.32rem;
          letter-spacing: 0.01em;
          font-weight: 800;
          color: #222;
        }
        .qbc-nav-tabs {
          display: flex;
          align-items: end;
          height: 100%;
          gap: 1px;
        }
        .qbc-nav-tab {
          background: transparent;
          border: none;
          font-size: 1rem;
          font-weight: 600;
          color: #222;
          padding: 20px 22px 12px 22px;
          border-bottom: 5px solid transparent;
          margin: 0;
          transition: border-bottom 0.18s, color 0.17s, background 0.12s;
          cursor: pointer;
          border-radius: 0;
        }
        .qbc-nav-tab.active, .qbc-nav-tab:hover {
          border-bottom: 5px solid #FF7043;
          color: #FF7043;
          background: rgba(255,193,7,0.08);
        }
        .qbc-tagline {
          margin-right: 24px;
          font-size: 0.99rem;
          color: #886006;
          font-weight: 500;
          letter-spacing: 0.01em;
        }
        .qbc-main-layout {
          display: flex;
          flex: 1 1 0;
          min-height: 0;
        }
        .qbc-content {
          flex: 1;
          padding: 44px 24px 28px 24px;
          min-height: 0;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
        }
        .qbc-searchbar-container {
          margin-bottom: 16px;
        }
        .qbc-searchbar {
          width: 100%;
          padding: 13px 16px;
          font-size: 1.05rem;
          border: 1.5px solid #E0E0E0;
          border-radius: 24px;
          background: #fff;
          color: #333;
          outline: none;
          transition: border 0.2s;
        }
        .qbc-searchbar:focus { border: 1.5px solid #FFC107; }
        .qbc-section-title {
          font-size: 1.65rem;
          font-weight: 700;
          margin-bottom: 4px;
          color: #FF7043;
        }
        .qbc-section-desc {
          color: #616161;
          font-size: 1.07rem;
          margin-bottom: 16px;
        }
        .qbc-card-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 24px;
        }
        .qbc-footer {
          text-align: center;
          padding: 18px 0;
          color: #798580;
          background: #F5F5F6;
          font-size: 0.98rem;
          margin-top: auto;
        }
        .qbc-empty { color: #BBB; font-style: italic; padding: 30px 0; text-align: center; }
        /* Recipe Card Styles */
        .qbc-card {
          background: #fff;
          border-radius: 18px;
          box-shadow: 0 2px 8px rgba(255,193,7,0.06), 0 1px 2px rgba(33,33,33,0.03);
          display: flex;
          flex-direction: column;
          transition: transform 0.13s, box-shadow 0.13s;
          overflow: hidden;
        }
        .qbc-card:hover {
          transform: scale(1.025);
          box-shadow: 0 4px 16px rgba(255,193,7,0.15), 0 2px 6px rgba(33,33,33,0.08);
        }
        .qbc-card-body {
          padding: 20px 18px 16px 18px;
        }
        .qbc-card-title {
          font-size: 1.12rem;
          margin: 0 0 4px 0;
          color: #222;
          font-weight: 600;
        }
        .qbc-card-meta {
          font-size: 0.97rem;
          color: #888;
          margin-bottom: 6px;
        }
        .qbc-tags {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        .qbc-tag {
          padding: 2.5px 10px;
          background: #FFFDE1;
          color: #FFC107;
          border-radius: 15px;
          font-size: 0.87rem;
          margin-top: 4px;
          font-weight: 500;
        }
        .qbc-tag.vegan { background: #FFFDE1; color: #4D8E33; }
        .qbc-tag.gluten-free { background: #EAF1FA; color: #FF7043;}
        .qbc-tag.budget { background: #FFF8E1; color: #8B7B1C;}
        .qbc-tag.student { background: #E3F2FD; color: #1565c0;}
        .qbc-tag['protein-packed'] { background: #FFEBEE; color: #FFC107;}
        /* Build-a-Recipe Wizard */
        .qbc-wizard {
          max-width: 540px;
          margin: 0 auto;
          background: #fff;
          box-shadow: 0 4px 18px #fff7e1;
          border-radius: 12px;
          padding: 42px 32px 30px 32px;
        }
        .qbc-wizard-step-indicator {
          font-size: 1rem;
          margin-bottom: 14px;
        }
        .qbc-wizard-options {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          justify-content: flex-start;
          margin-top: 12px;
        }
        .qbc-btn-wizard {
          font-size: 0.99rem;
          background: #FFF8E1;
          border: 1.7px solid #FFC107;
          color: #B58C09;
          border-radius: 18px;
          padding: 7px 18px;
          cursor: pointer;
          transition: background 0.17s, color 0.17s, border 0.17s;
        }
        .qbc-btn-wizard.selected, .qbc-btn-wizard:hover {
          background: #FFC107;
          color: #fff;
          border: 1.7px solid #FF7043;
        }
        .qbc-wizard-actions {
          margin-top: 22px;
          display: flex;
          gap: 15px;
          justify-content: flex-end;
        }
        .qbc-btn-primary {
          background: #FFC107;
          color: #222;
          border: none;
          border-radius: 8px;
          font-size: 1.04rem;
          padding: 7px 20px;
          font-weight: 700;
          cursor: pointer;
          transition: background 0.2s;
        }
        .qbc-btn-primary:hover {
          background: #ffdf52; 
        }
        .qbc-btn-secondary {
          background: #FF7043;
          color: #FFFDE1;
          border: none;
          border-radius: 8px;
          font-size: 1.03rem;
          padding: 7px 16px;
          font-weight: 700;
          cursor: pointer;
        }
        .qbc-btn-accent {
          background: #FF7043;
          color: #fff;
          border: none;
          border-radius: 8px;
          font-size: 1.01rem;
          padding: 7px 16px;
          font-weight: 600;
          cursor: pointer;
        }
        .qbc-summary-list {
          margin: 0;
          padding-left: 19px;
          font-size: 1.07rem;
          color: #363636;
        }
        .qbc-summary .dimmed { color: #BDBDBD; }
        @media (max-width: 900px) {
          .qbc-navbar { flex-direction: column; height: auto; }
          .qbc-nav-tabs { order: 2; width: 100%; justify-content: center; }
          .qbc-logo, .qbc-tagline { order: 1; }
          .qbc-content { padding: 26px 3vw; }
          .qbc-wizard { padding: 25px 5vw 18px 5vw; }
        }
        @media (max-width: 600px) {
          .qbc-content { padding: 17px 1vw;}
        }
      `}</style>
    </div>
  );
}

/**
 * Recipe Card Component
 * @param {object} props - title, ingredient count, tags array (NO IMAGE)
 */
function RecipeCard({ title, ingredients, tags }) {
  return (
    <div className="qbc-card">
      <div className="qbc-card-body">
        <div className="qbc-card-title">{title}</div>
        <div className="qbc-card-meta">{ingredients} ingredients</div>
        <div className="qbc-tags">
          {tags.map(tag =>
            <span key={tag} className={`qbc-tag ${tag.replace(/\s+/g, '-').toLowerCase()}`}>{tag}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuickBiteMainContainer;
