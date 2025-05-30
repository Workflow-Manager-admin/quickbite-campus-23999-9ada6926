import React, { useState, useMemo } from 'react';
import './App.css';

// Theme colors for QuickBite Campus
const COLORS = {
  primary: '#4CAF50',
  secondary: '#FFC107',
  accent: '#FF7043',
  background: '#FAFAFA',
  text: '#232323',
  tagBg: '#F5F5F5'
};

// Sample data for recipes (demo only)
const RECIPE_SECTIONS = [
  {
    tab: "5-Ingredient Recipes",
    key: "fiveIngredient",
    subtitle: "Simple meals, max flavor, minimal effort.",
    description: "Delicious dishes with just five ingredients.",
    recipes: [
      {
        title: "Cheesy Garlic Pasta",
        image: "https://images.unsplash.com/photo-1519864600265-abb23847efc4?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegetarian", "student-friendly"],
        ingredientCount: 5
      },
      {
        title: "Quick Egg Fried Rice",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=compress&fit=crop&w=300&q=80",
        tags: ["quick", "budget"],
        ingredientCount: 5
      },
      {
        title: "One-pan Chili Nachos",
        image: "https://images.unsplash.com/photo-1519852476563-cb2f6f051eef?auto=compress&fit=crop&w=300&q=80",
        tags: ["snack", "student"],
        ingredientCount: 5
      }
    ]
  },
  {
    tab: "Student Meals",
    key: "studentMeals",
    subtitle: "Budget-friendly & quick, made for students.",
    description: "Tasty meals on a student budget.",
    recipes: [
      {
        title: "Microwave Veggie Quesadilla",
        image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegetarian", "microwave"],
        ingredientCount: 6
      },
      {
        title: "No-Cook Overnight Oats",
        image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=compress&fit=crop&w=300&q=80",
        tags: ["no-cook", "healthy", "breakfast"],
        ingredientCount: 5
      },
      {
        title: "Instant Noodle Stir-Fry",
        image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=compress&fit=crop&w=300&q=80",
        tags: ["quick", "budget"],
        ingredientCount: 6
      }
    ]
  },
  {
    tab: "Vegan & Plant-Based Galaxy",
    key: "veganGalaxy",
    subtitle: "Explore protein-packed plant-based recipes.",
    description: "All plant-based, grouped by protein.",
    groupByProtein: true,
    proteinCategories: [
      {
        protein: "Tofu",
        recipes: [
          {
            title: "Crispy Tofu Bites",
            image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=compress&fit=crop&w=300&q=80",
            tags: ["vegan", "tofu"],
            ingredientCount: 5
          }
        ]
      },
      {
        protein: "Lentils",
        recipes: [
          {
            title: "Lentil Sloppy Joes",
            image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=compress&fit=crop&w=300&q=80",
            tags: ["vegan", "lentils", "protein-rich"],
            ingredientCount: 6
          }
        ]
      },
      {
        protein: "Seitan",
        recipes: [
          {
            title: "Seitan Stir-Fry",
            image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=compress&fit=crop&w=300&q=80",
            tags: ["vegan", "seitan"],
            ingredientCount: 5
          }
        ]
      }
    ]
  }
];

// Options for Build-a-Recipe tool (demo only)
const BASE_OPTIONS = ["Pasta", "Rice", "Salad Greens", "Bread"];
const INGREDIENT_OPTIONS = [
  { name: "Tofu", tags: ["vegan", "protein"] },
  { name: "Cheese", tags: ["vegetarian"] },
  { name: "Tomato", tags: [] },
  { name: "Egg", tags: ["vegetarian", "protein"] },
  { name: "Chickpeas", tags: ["vegan", "protein"] },
  { name: "Corn", tags: [] },
  { name: "Spinach", tags: ["vegan"] },
  { name: "Chicken", tags: ["protein"] }
];
const DIET_PREFS = ["Vegan", "Vegetarian", "Gluten-Free"];

// Card UI for recipes
function RecipeCard({ recipe }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px 0 #0001",
      overflow: "hidden",
      width: 250,
      margin: "0 10px 24px 0",
      display: "inline-block",
      verticalAlign: "top"
    }}>
      <img
        src={recipe.image}
        alt={recipe.title}
        style={{ width: "100%", height: 140, objectFit: "cover" }}
      />
      <div style={{ padding: 16 }}>
        <div style={{
          fontWeight: 600,
          fontSize: "1.1rem",
          color: COLORS.primary,
          marginBottom: 8
        }}>
          {recipe.title}
        </div>
        <div style={{
          fontSize: "0.98rem",
          marginBottom: 8,
          color: "#8A8A8A"
        }}>
          {recipe.ingredientCount} ingredients
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {(recipe.tags || []).map((tag, idx) =>
            <span key={idx} style={{
              background: COLORS.tagBg,
              color: COLORS.accent,
              borderRadius: 8,
              fontSize: 12,
              padding: "2px 8px"
            }}>{tag}</span>
          )}
        </div>
      </div>
    </div>
  );
}

// Section view for a recipe list or plant-based grouping
function RecipeSection({ section, searchTerm }) {
  if (section.groupByProtein && section.proteinCategories) {
    // Plant-based: grouped by protein
    return (
      <div>
        <div className="subtitle" style={{ color: COLORS.primary }}>{section.subtitle}</div>
        <div className="description" style={{ marginBottom: 24 }}>{section.description}</div>
        {section.proteinCategories.map(category =>
          <div key={category.protein} style={{ marginBottom: 40 }}>
            <h3 style={{ color: COLORS.secondary, marginBottom: 12 }}>{category.protein}</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {category.recipes.filter(r => {
                if (!searchTerm) return true;
                const needle = searchTerm.toLowerCase();
                return (
                  r.title.toLowerCase().includes(needle) ||
                  (r.tags && r.tags.join(' ').toLowerCase().includes(needle))
                );
              }).map((recipe, idx) => (
                <RecipeCard key={idx} recipe={recipe} />
              ))}
              {/* If none, show message */}
              {category.recipes.filter(r => {
                if (!searchTerm) return true;
                const needle = searchTerm.toLowerCase();
                return (
                  r.title.toLowerCase().includes(needle) ||
                  (r.tags && r.tags.join(' ').toLowerCase().includes(needle))
                );
              }).length === 0 && <div style={{ color: "#ccc" }}>No recipes found for "{searchTerm}".</div>}
            </div>
          </div>
        )}
      </div>
    );
  }
  // Regular section
  return (
    <div>
      <div className="subtitle" style={{ color: COLORS.primary }}>{section.subtitle}</div>
      <div className="description" style={{ marginBottom: 24 }}>{section.description}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {section.recipes.filter(r => {
          if (!searchTerm) return true;
          const needle = searchTerm.toLowerCase();
          return (
            r.title.toLowerCase().includes(needle) ||
            (r.tags && r.tags.join(' ').toLowerCase().includes(needle))
          );
        }).map((recipe, idx) => (
          <RecipeCard key={idx} recipe={recipe} />
        ))}
        {/* If none, show message */}
        {section.recipes.filter(r => {
          if (!searchTerm) return true;
          const needle = searchTerm.toLowerCase();
          return (
            r.title.toLowerCase().includes(needle) ||
            (r.tags && r.tags.join(' ').toLowerCase().includes(needle))
          );
        }).length === 0 && <div style={{ color: "#ccc" }}>No recipes found for "{searchTerm}".</div>}
      </div>
    </div>
  );
}

// Wizard for Build-a-Recipe feature
function BuildARecipe({}) {
  const [step, setStep] = useState(0);
  const [base, setBase] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [diet, setDiet] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Step screens
  function reset() {
    setStep(0);
    setBase('');
    setIngredients([]);
    setDiet('');
    setShowResult(false);
  }
  // Demo hint: filtered potential "created recipe"
  const generatedRecipe = useMemo(() => {
    return {
      title: `${base}${ingredients.length ? ' with ' + ingredients.join(' & ') : ''}`.trim(),
      image: "https://images.unsplash.com/photo-1519864600265-abb23847efc4?auto=compress&fit=crop&w=300&q=80",
      tags: [
        diet.toLowerCase(),
        "custom"
      ].filter(Boolean),
      ingredientCount: 1 + ingredients.length
    };
  }, [base, ingredients, diet]);
  return (
    <div>
      <div className="subtitle" style={{ color: COLORS.primary }}>Customize Your Meal</div>
      <div className="description" style={{ marginBottom: 20 }}>
        Build your perfect recipe from what you have!
      </div>

      {!showResult ? (
        <div style={{
          background: "#fff",
          borderRadius: 16,
          boxShadow: "0 2px 8px #0001",
          maxWidth: 420,
          margin: "0 auto",
          padding: 24
        }}>
          {step === 0 && (
            <div>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Step 1: Choose a Base</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {BASE_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    className="btn"
                    style={{
                      background: base === opt ? COLORS.primary : COLORS.secondary,
                      color: "#fff",
                      marginBottom: 8,
                      fontWeight: 500
                    }}
                    onClick={() => setBase(opt)}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 24, textAlign: "right" }}>
                <button
                  className="btn"
                  style={{
                    background: base ? COLORS.accent : "#ccc",
                    color: "#fff",
                    fontWeight: 500,
                    cursor: base ? "pointer" : "not-allowed"
                  }}
                  onClick={() => base && setStep(1)}
                  disabled={!base}
                >
                  Next ➔
                </button>
              </div>
            </div>
          )}
          {step === 1 && (
            <div>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Step 2: Pick Ingredients</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {INGREDIENT_OPTIONS.map(opt => (
                  <button
                    key={opt.name}
                    className="btn"
                    style={{
                      background: ingredients.includes(opt.name) ? COLORS.primary : COLORS.secondary,
                      color: "#fff"
                    }}
                    onClick={() => {
                      setIngredients(ingredients.includes(opt.name) ?
                        ingredients.filter(i => i !== opt.name) :
                        [...ingredients, opt.name]
                      );
                    }}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
              <div style={{ marginTop: 24, textAlign: "right" }}>
                <button
                  className="btn"
                  style={{ background: COLORS.accent, color: "#fff", marginRight: 12 }}
                  onClick={() => setStep(0)}
                >⟵ Back</button>
                <button
                  className="btn"
                  style={{
                    background: ingredients.length ? COLORS.accent : "#ccc",
                    color: "#fff",
                    fontWeight: 500,
                    cursor: ingredients.length ? "pointer" : "not-allowed"
                  }}
                  onClick={() => ingredients.length && setStep(2)}
                  disabled={!ingredients.length}
                >
                  Next ➔
                </button>
              </div>
            </div>
          )}
          {step === 2 && (
            <div>
              <div style={{ fontWeight: 500, marginBottom: 12 }}>Step 3: Dietary Preferences</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                {DIET_PREFS.map(opt => (
                  <button
                    key={opt}
                    className="btn"
                    style={{
                      background: diet === opt ? COLORS.primary : COLORS.secondary,
                      color: "#fff"
                    }}
                    onClick={() => setDiet(opt)}
                  >
                    {opt}
                  </button>
                ))}
                <button
                  className="btn"
                  style={{ background: !diet ? COLORS.primary : COLORS.secondary, color: "#fff" }}
                  onClick={() => setDiet('')}
                >None</button>
              </div>
              <div style={{ marginTop: 24, textAlign: "right" }}>
                <button
                  className="btn"
                  style={{ background: COLORS.accent, color: "#fff", marginRight: 12 }}
                  onClick={() => setStep(1)}
                >⟵ Back</button>
                <button
                  className="btn"
                  style={{ background: COLORS.accent, color: "#fff", fontWeight: 500 }}
                  onClick={() => setShowResult(true)}
                >
                  See Recipe
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div style={{
          background: "#fff",
          borderRadius: 16,
          maxWidth: 440,
          margin: "0 auto",
          padding: 32,
          boxShadow: "0 2px 8px #0001"
        }}>
          <div style={{ marginBottom: 24, textAlign: "center" }}>
            <div style={{ fontWeight: 600, fontSize: "1.18rem", color: COLORS.primary }}>Your Custom Recipe</div>
          </div>
          <RecipeCard recipe={generatedRecipe} />
          <div style={{ marginTop: 20 }}>
            <button className="btn" style={{ background: COLORS.accent, color: "#fff" }} onClick={reset}>Build Another</button>
          </div>
        </div>
      )}
    </div>
  );
}

// Simple tab navigation bar
function Tabs({ sections, current, onTabChange }) {
  return (
    <nav
      style={{
        background: "#fff",
        borderRadius: 12,
        display: "flex",
        gap: 8,
        padding: "8px",
        boxShadow: "0 2px 4px #0001",
        marginBottom: 28,
        marginTop: 12
      }}
    >
      {sections.map(({ tab, key }) => (
        <button
          key={key}
          onClick={() => onTabChange(key)}
          style={{
            background: key === current ? COLORS.primary : "#F9F9F9",
            color: key === current ? "#fff" : COLORS.primary,
            border: "none",
            outline: "none",
            borderRadius: 8,
            fontWeight: 500,
            fontSize: 16,
            padding: "8px 20px",
            cursor: "pointer",
            transition: "background 0.2s"
          }}
        >
          {tab}
        </button>
      ))}
      <button
        onClick={() => onTabChange("buildARecipe")}
        style={{
          background: current === "buildARecipe" ? COLORS.accent : "#F9F9F9",
          color: current === "buildARecipe" ? "#fff" : COLORS.accent,
          border: "none",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 16,
          padding: "8px 20px",
          marginLeft: "auto",
          cursor: "pointer"
        }}
      >Build-a-Recipe</button>
    </nav>
  );
}

// Main App
// PUBLIC_INTERFACE
function App() {
  // Track current section/tab, and search bar state
  const [tab, setTab] = useState("fiveIngredient");
  const [search, setSearch] = useState('');

  // narrow tab lookup
  const currentSection = RECIPE_SECTIONS.find(s => s.key === tab);

  return (
    <div
      className="app"
      style={{
        background: COLORS.background,
        color: COLORS.text,
        minHeight: "100vh"
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar"
        style={{
          background: COLORS.primary,
          color: "#fff",
          position: "fixed",
          zIndex: 100,
          width: "100%",
          top: 0,
          left: 0,
          border: "none",
          boxShadow: "0 2px 8px #0002"
        }}
      >
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div
            className="logo"
            style={{ fontSize: 22, fontWeight: 700, letterSpacing: 1.2 }}
          >
            <span
              className="logo-symbol"
              style={{ color: COLORS.secondary, fontSize: 30, marginRight: 7 }}
            >🍽️</span>
            QuickBite Campus
          </div>
          <a href="#build" style={{ color: "#fff", textDecoration: "none", fontWeight: 400 }}>
            <span style={{ border: "1px solid #fff7", padding: "6px 18px", borderRadius: 22, background: COLORS.accent, marginLeft: 12 }}>
              Build-a-Recipe
            </span>
          </a>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ paddingTop: 88, background: COLORS.background }}>
        <div className="container" style={{ minHeight: 500 }}>
          {/* Hero section with search */}
          <div
            className="hero"
            style={{
              paddingTop: 32,
              paddingBottom: 18,
              textAlign: "center",
              alignItems: "center"
            }}
          >
            <div
              className="subtitle"
              style={{ color: COLORS.secondary, fontSize: 19, fontWeight: 500 }}
            >
              Eat smart, fast, and delicious on campus.
            </div>
            <h1
              className="title"
              style={{ fontSize: 40, fontWeight: 800, color: COLORS.primary, margin: 0 }}
            >
              QuickBite Campus
            </h1>
            <div
              className="description"
              style={{
                color: "#333",
                fontSize: 18,
                margin: "8px 0 12px 0",
                maxWidth: 540
              }}
            >
              Discover easy student meals, plant-powered recipes, fast 5-ingredient dishes and create your own in minutes.
            </div>
            {/* Search bar */}
            <div style={{
              marginTop: 14,
              marginBottom: 8,
              width: "100%",
              maxWidth: 420,
              position: "relative",
              display: "inline-block"
            }}>
              <input
                type="text"
                placeholder="🔍 Search recipes, tags, or ingredients…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: "100%",
                  borderRadius: 24,
                  border: `1px solid #c5eedb`,
                  padding: "13px 24px",
                  fontSize: 16,
                  background: "#fff",
                  boxShadow: "0 1px 4px #0001",
                  color: "#333",
                  outline: "none",
                  transition: "box-shadow 0.2s"
                }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  style={{
                    position: "absolute",
                    right: 12,
                    top: 10,
                    background: "transparent",
                    color: COLORS.primary,
                    border: "none",
                    fontWeight: 700,
                    fontSize: 20,
                    cursor: "pointer"
                  }}
                  title="Clear"
                >⨯</button>
              )}
            </div>
          </div>
          {/* Tabs */}
          <Tabs
            sections={RECIPE_SECTIONS}
            current={tab}
            onTabChange={setTab}
          />
          {/* Section Display */}
          <div style={{ marginBottom: 44 }}>
            {tab === "buildARecipe" ? (
              <BuildARecipe />
            ) : currentSection ? (
              <RecipeSection section={currentSection} searchTerm={search} />
            ) : null}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          width: "100%",
          background: COLORS.primary,
          color: "#fff",
          padding: "16px 0",
          textAlign: "center",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          marginTop: 30,
          letterSpacing: 0.5,
          fontSize: 15
        }}
      >
        © {new Date().getFullYear()} QuickBite Campus. Designed for students — Eat Quick, Think Big!
      </footer>
    </div>
  );
}

export default App;
