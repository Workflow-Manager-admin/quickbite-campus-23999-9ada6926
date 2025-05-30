import React, { useState } from 'react';

/**
 * Main Container for QuickBite Campus web app.
 * Card-based layout, horizontal tab navigation, search, build-a-recipe wizard.
 * Theme: light, primary color: #FFC107 (yellow), accent: #FF7043.
 */

/*
 * Expanded recipe data - 15 recipes for each main section (total: 60 recipes)
 * Each contains: title, ingredient count, quick tags, and detailed steps (NO IMAGES)
 */
const DEMO_RECIPES = [
  // 5-Ingredient Recipes (<=5 ingredients, general crowd-pleasers)
  {
    id: 1,
    title: "Avocado Toast Deluxe",
    ingredients: 5,
    tags: ["vegan", "quick"],
    steps: [
      "Toast two slices of bread until golden and crisp.",
      "Halve an avocado, remove the pit, and scoop the flesh into a bowl.",
      "Mash avocado with a pinch of salt and pepper.",
      "Spread mashed avocado evenly over the toast.",
      "Top with chili flakes and a drizzle of olive oil. Serve immediately."
    ]
  },
  {
    id: 2,
    title: "One-Pan Spicy Pasta",
    ingredients: 4,
    tags: ["student", "gluten-free"],
    steps: [
      "Boil water in a large skillet and add your favorite pasta.",
      "Once halfway cooked, add chopped veggies of choice and stir.",
      "Mix in a spicy tomato sauce and simmer until pasta is cooked and sauce thickens.",
      "Top with grated cheese or nutritional yeast before serving."
    ]
  },
  {
    id: 3,
    title: "Smashed Chickpea Salad",
    ingredients: 5,
    tags: ["vegan", "protein-packed"],
    steps: [
      "Drain and rinse canned chickpeas.",
      "Roughly mash chickpeas in a bowl with a fork or potato masher.",
      "Add chopped celery, onion, and vegan mayo (or yogurt); mix well.",
      "Season with lemon juice, salt, and black pepper to taste.",
      "Serve on toast, in a wrap, or over greens."
    ]
  },
  {
    id: 4,
    title: "Egg Fried Rice",
    ingredients: 5,
    tags: ["student", "budget"],
    steps: [
      "Heat oil in a nonstick skillet or wok over medium heat.",
      "Add cooked rice and veggies; stir-fry for 1-2 minutes.",
      "Push rice to the side and pour in beaten eggs, scrambling lightly.",
      "Mix eggs into the rice and season with soy sauce.",
      "Top with chopped green onions before serving."
    ]
  },
  {
    id: 5,
    title: "Tofu Stir-fry",
    ingredients: 4,
    tags: ["vegan", "gluten-free"],
    steps: [
      "Cube tofu and pat dry with a paper towel.",
      "Heat oil in a large pan and cook tofu until lightly browned.",
      "Add sliced veggies (like peppers, broccoli) and stir-fry for another 3-4 minutes.",
      "Pour in a simple sauce (soy or tamari, garlic, ginger, and a touch of sweetener).",
      "Cook until veggies are just tender. Serve with rice or noodles."
    ]
  },
  {
    id: 6,
    title: "Peanut Butter Banana Wrap",
    ingredients: 3,
    tags: ["vegetarian", "quick"],
    steps: [
      "Lay a tortilla flat and spread peanut butter evenly over it.",
      "Place a peeled banana at one edge and roll the tortilla up tightly.",
      "Slice into rounds or eat whole."
    ]
  },
  {
    id: 7,
    title: "Easy Tuna Melt",
    ingredients: 5,
    tags: ["student", "protein-packed"],
    steps: [
      "Mix canned tuna with mayo, a little mustard, and pepper.",
      "Spread tuna mixture onto bread slices.",
      "Top with cheese and another bread slice.",
      "Toast in a pan or sandwich maker until golden and cheese melts."
    ]
  },
  {
    id: 8,
    title: "Mug Omelette",
    ingredients: 4,
    tags: ["breakfast", "budget"],
    steps: [
      "Crack two eggs into a mug, add milk, salt, and pepper.",
      "Add diced veggies or ham if available.",
      "Mix well with a fork.",
      "Microwave for 1-2 minutes, stirring halfway until set."
    ]
  },
  {
    id: 9,
    title: "Quick Greek Salad",
    ingredients: 5,
    tags: ["vegetarian", "gluten-free"],
    steps: [
      "Chop cucumber, tomato, and onion.",
      "Toss in a bowl with olives and feta cheese.",
      "Drizzle with olive oil and a little vinegar.",
      "Add salt, pepper, and dried oregano; toss again to serve."
    ]
  },
  {
    id: 10,
    title: "No-Cook Overnight Oats",
    ingredients: 5,
    tags: ["vegan", "breakfast"],
    steps: [
      "Mix rolled oats, non-dairy milk, a little maple syrup, and chia seeds in a jar.",
      "Stir well.",
      "Top with sliced fruit or berries.",
      "Refrigerate overnight and grab in the morning."
    ]
  },
  {
    id: 11,
    title: "Parmesan Zucchini Fries",
    ingredients: 5,
    tags: ["vegetarian", "snack"],
    steps: [
      "Cut zucchini into thick fries.",
      "Toss with olive oil and grated parmesan.",
      "Spread on a baking sheet in a single layer.",
      "Bake at 425°F for 15-20 mins, flipping halfway, until golden.",
      "Sprinkle with additional parmesan before serving."
    ]
  },
  {
    id: 12,
    title: "Spicy Black Bean Quesadilla",
    ingredients: 5,
    tags: ["vegetarian", "budget"],
    steps: [
      "Mash canned black beans and mix with chopped jalapeno.",
      "Spread mixture over half a tortilla, sprinkle with cheese.",
      "Fold, toast in a pan until golden, then cut into wedges."
    ]
  },
  {
    id: 13,
    title: "Chickpea-Peanut Curry",
    ingredients: 5,
    tags: ["vegan", "student"],
    steps: [
      "Sauté chopped onion until translucent.",
      "Add drained chickpeas and curry powder.",
      "Pour in coconut milk and simmer gently.",
      "Stir in peanut butter, cook until thickened.",
      "Serve with rice or flatbread."
    ]
  },
  {
    id: 14,
    title: "Honey Mustard Chicken Bake",
    ingredients: 5,
    tags: ["student", "protein-packed"],
    steps: [
      "Arrange chicken breasts in a baking dish.",
      "Mix together honey and mustard, pour over chicken.",
      "Sprinkle with salt and pepper.",
      "Bake at 400°F (200°C) for 25-30 minutes until cooked through."
    ]
  },
  {
    id: 15,
    title: "Simple Caprese Salad",
    ingredients: 4,
    tags: ["vegetarian", "quick"],
    steps: [
      "Slice fresh mozzarella and tomatoes.",
      "Layer with basil leaves on a plate.",
      "Drizzle with olive oil and balsamic vinegar.",
      "Season with salt and pepper, and serve."
    ]
  },

  // Student Meals (budget, quick, filling, not always minimal ingredients)
  {
    id: 16,
    title: "BBQ Chicken & Rice Bowl",
    ingredients: 7,
    tags: ["student", "budget"],
    steps: [
      "Cook rice according to package instructions.",
      "Grill or pan-cook chicken strips.",
      "Toss chicken in bottled BBQ sauce.",
      "Serve chicken over rice with canned corn and black beans.",
      "Top with green onions and shredded cheese."
    ]
  },
  {
    id: 17,
    title: "Dorm Mac & Cheese",
    ingredients: 6,
    tags: ["student", "budget"],
    steps: [
      "Boil macaroni according to package directions.",
      "Drain and return to pot.",
      "Stir in butter and milk until thick.",
      "Add shredded cheese and stir until melted.",
      "Season with black pepper."
    ]
  },
  {
    id: 18,
    title: "Budget Taco Skillet",
    ingredients: 7,
    tags: ["student", "quick"],
    steps: [
      "Cook ground beef in a skillet until browned.",
      "Stir in taco seasoning and a little water.",
      "Add canned corn and drained black beans.",
      "Top with crushed tortilla chips and cheese.",
      "Broil briefly for a crisp topping."
    ]
  },
  {
    id: 19,
    title: "Pita Pizza",
    ingredients: 5,
    tags: ["student", "quick"],
    steps: [
      "Preheat oven to 425°F (220°C).",
      "Spread pizza sauce over pita breads.",
      "Top with shredded cheese and favorite toppings.",
      "Bake 8-10 minutes until bubbly.",
      "Slice and enjoy."
    ]
  },
  {
    id: 20,
    title: "Chili Cheese Toast",
    ingredients: 5,
    tags: ["student", "vegetarian"],
    steps: [
      "Toast thick bread slices lightly.",
      "Spread canned vegetarian chili over toast.",
      "Top with shredded cheese.",
      "Broil until cheese melts and bubbles.",
      "Sprinkle with green onion."
    ]
  },
  {
    id: 21,
    title: "Classic Ramen Noodle Soup",
    ingredients: 6,
    tags: ["student", "budget"],
    steps: [
      "Boil water and cook ramen noodles.",
      "Add seasoning packet to taste.",
      "Drop in sliced carrots and spinach while cooking.",
      "Top with a soft-boiled egg, if desired."
    ]
  },
  {
    id: 22,
    title: "Cheesy Broccoli Rice Casserole",
    ingredients: 7,
    tags: ["student", "vegetarian"],
    steps: [
      "Cook instant rice following package directions.",
      "Steam or microwave broccoli until just tender.",
      "Combine with cheese and a little milk in a baking dish.",
      "Season, then bake until cheese is bubbly."
    ]
  },
  {
    id: 23,
    title: "Sweetcorn Fritters",
    ingredients: 7,
    tags: ["vegetarian", "budget"],
    steps: [
      "Mix canned corn, eggs, flour, green onions, a pinch of salt and pepper.",
      "Heat oil in skillet, drop spoonfuls of batter.",
      "Fry until golden, flip and finish frying on the other side."
    ]
  },
  {
    id: 24,
    title: "Fast BBQ Bean Wrap",
    ingredients: 5,
    tags: ["vegan", "budget"],
    steps: [
      "Warm tortilla wraps.",
      "Spread baked beans in BBQ sauce on each wrap.",
      "Add lettuce or spinach.",
      "Roll up and eat."
    ]
  },
  {
    id: 25,
    title: "Egg Drop Soup",
    ingredients: 5,
    tags: ["gluten-free", "student"],
    steps: [
      "Bring broth to a simmer in a saucepan.",
      "In a bowl, beat eggs lightly.",
      "Slowly drizzle eggs into simmering broth, stirring gently.",
      "Add sliced green onions and season with pepper.",
      "Serve hot."
    ]
  },
  {
    id: 26,
    title: "Tuna Pasta Salad",
    ingredients: 6,
    tags: ["student", "protein-packed"],
    steps: [
      "Cook pasta, then cool under cold water.",
      "Mix with canned tuna, mayo, diced veggies, and salt & pepper.",
      "Chill before serving."
    ]
  },
  {
    id: 27,
    title: "Thai Peanut Instant Noodles",
    ingredients: 6,
    tags: ["student", "quick"],
    steps: [
      "Prepare instant noodles as directed, omitting flavor packet.",
      "In a bowl, mix peanut butter, soy sauce, and chili flakes.",
      "Drain noodles, toss in sauce with sliced green onion.",
      "Top with chopped peanuts if desired."
    ]
  },
  {
    id: 28,
    title: "Breakfast Burrito",
    ingredients: 7,
    tags: ["student", "breakfast"],
    steps: [
      "Scramble eggs in a skillet.",
      "Warm tortillas.",
      "Fill with eggs, cheese, salsa, and any leftover veggies or beans.",
      "Roll up and serve hot."
    ]
  },
  {
    id: 29,
    title: "Rice & Bean Burrito Bowl",
    ingredients: 6,
    tags: ["vegan", "budget"],
    steps: [
      "Cook rice and season with a pinch salt.",
      "Add drained canned beans, corn, and salsa.",
      "Top with shredded lettuce and chopped tomato."
    ]
  },
  {
    id: 30,
    title: "Cheesy Veggie Scramble",
    ingredients: 5,
    tags: ["vegetarian", "breakfast"],
    steps: [
      "Whisk eggs and season with salt and pepper.",
      "Cook in a skillet with chopped veggies.",
      "Add cheese, fold, and serve hot."
    ]
  },

  // Vegan & Plant-Based Galaxy (15 unique, varied protein/focus)
  {
    id: 31,
    title: "Lentil Shepherd's Pie",
    ingredients: 8,
    tags: ["vegan", "protein-packed"],
    steps: [
      "Cook lentils in vegetable broth until tender.",
      "Sauté onion, carrot, and celery until soft.",
      "Combine with tomatoes and cooked lentils.",
      "Spread mixture in baking dish, top with mashed potatoes.",
      "Bake until golden and heated through."
    ]
  },
  {
    id: 32,
    title: "Spicy Peanut Noodle Bowl",
    ingredients: 7,
    tags: ["vegan", "quick"],
    steps: [
      "Boil noodles per package directions.",
      "Mix peanut butter, soy sauce, chili paste, and lime juice for sauce.",
      "Toss noodles and sauce together with shredded carrots.",
      "Top with green onion and sesame seeds."
    ]
  },
  {
    id: 33,
    title: "Simple Tofu Curry",
    ingredients: 7,
    tags: ["vegan", "gluten-free"],
    steps: [
      "Cube tofu and pan-fry until golden.",
      "Sauté onion with curry paste.",
      "Add coconut milk and veggies, simmer.",
      "Add tofu at the end and heat through."
    ]
  },
  {
    id: 34,
    title: "Black Bean Mango Salsa Bowl",
    ingredients: 8,
    tags: ["vegan", "high-fiber"],
    steps: [
      "Dice mango, red onion, and mix with black beans.",
      "Add corn, chopped bell pepper, and cilantro.",
      "Toss with lime juice, salt, and pepper.",
      "Serve with rice or tortilla chips."
    ]
  },
  {
    id: 35,
    title: "Quinoa Chickpea Salad",
    ingredients: 6,
    tags: ["vegan", "protein-packed"],
    steps: [
      "Cook quinoa per package directions and cool.",
      "Mix with canned chickpeas, chopped cucumber and tomato.",
      "Toss with lemon juice, olive oil, salt, and pepper."
    ]
  },
  {
    id: 36,
    title: "Lentil & Spinach Soup",
    ingredients: 7,
    tags: ["vegan", "gluten-free"],
    steps: [
      "Sauté onion and garlic.",
      "Add carrots and celery.",
      "Add lentils and vegetable broth, simmer until lentils are tender.",
      "Stir in spinach until wilted.",
      "Season with lemon and pepper."
    ]
  },
  {
    id: 37,
    title: "Baked Falafel Pita",
    ingredients: 8,
    tags: ["vegan", "meal-prep"],
    steps: [
      "Blend canned chickpeas, onion, garlic, and spices.",
      "Form patties and bake until golden.",
      "Stuff in pita with lettuce, tomato, and tahini sauce."
    ]
  },
  {
    id: 38,
    title: "Chickpea Tuna Sandwich",
    ingredients: 6,
    tags: ["vegan", "quick"],
    steps: [
      "Mash chickpeas with vegan mayo, mustard, and relish.",
      "Add diced celery and onion.",
      "Spread on bread or crackers."
    ]
  },
  {
    id: 39,
    title: "BBQ Jackfruit Sliders",
    ingredients: 7,
    tags: ["vegan", "student"],
    steps: [
      "Drain canned jackfruit, shred with forks.",
      "Sauté briefly and add BBQ sauce.",
      "Serve in slider buns with cabbage slaw."
    ]
  },
  {
    id: 40,
    title: "Southwest Sweet Potato Bowl",
    ingredients: 7,
    tags: ["vegan", "gluten-free"],
    steps: [
      "Roast cubed sweet potato until tender.",
      "Serve over rice with black beans, corn, and salsa.",
      "Top with avocado and cilantro."
    ]
  },
  {
    id: 41,
    title: "Vegan Chickpea 'Egg' Salad",
    ingredients: 6,
    tags: ["vegan", "quick"],
    steps: [
      "Mash chickpeas in a bowl.",
      "Add vegan mayo, mustard, diced celery, and green onion.",
      "Season with black salt (kala namak) for 'egg' flavor.",
      "Serve on breads or lettuce."
    ]
  },
  {
    id: 42,
    title: "Seitan Stir-fry",
    ingredients: 7,
    tags: ["vegan", "protein-packed"],
    steps: [
      "Slice seitan and sauté in skillet.",
      "Add chopped broccoli, peppers, and carrots.",
      "Stir-fry with soy sauce and a splash of sesame oil.",
      "Serve with rice."
    ]
  },
  {
    id: 43,
    title: "Edamame Hummus Dip",
    ingredients: 6,
    tags: ["vegan", "snack"],
    steps: [
      "Blend cooked edamame, lemon juice, tahini, garlic, salt, and olive oil.",
      "Serve with veggie sticks or pita chips."
    ]
  },
  {
    id: 44,
    title: "White Bean Avocado Toast",
    ingredients: 5,
    tags: ["vegan", "quick"],
    steps: [
      "Toast bread of choice.",
      "Mash white beans with avocado, lemon juice, salt, and chili flakes.",
      "Spread on toast. Top with herbs."
    ]
  },
  {
    id: 45,
    title: "Tofu & Broccoli Sheet Pan Dinner",
    ingredients: 7,
    tags: ["vegan", "meal-prep"],
    steps: [
      "Cube tofu and chop broccoli.",
      "Toss with olive oil, garlic powder, and soy sauce.",
      "Roast on sheet pan at 425°F for 20 min.",
      "Serve with brown rice or quinoa."
    ]
  },

  // Build-a-Recipe (examples to help guide the 'wizard'; shown if needed for search)
  {
    id: 46,
    title: "Custom Protein Power Bowl",
    ingredients: 5,
    tags: ["student", "build-a-recipe"],
    steps: [
      "Choose a cooked base (pasta, rice, bread, or tortilla).",
      "Add selected protein (egg, chickpeas, tofu, chicken, or beans).",
      "Toss in any available and preferred veggies.",
      "Drizzle with sauce of choice.",
      "Serve warm in a bowl or plate."
    ]
  },
  {
    id: 47,
    title: "Veggie-Loaded Sandwich",
    ingredients: 6,
    tags: ["vegetarian", "build-a-recipe"],
    steps: [
      "Pick a bread type (slice, focaccia, pita, etc.).",
      "Spread with hummus or cream cheese.",
      "Layer with selected veggies (lettuce, tomato, carrot, cucumber).",
      "Add protein if desired (eggs, beans).",
      "Close sandwich and slice."
    ]
  },
  {
    id: 48,
    title: "Quick Wrap It Up",
    ingredients: 4,
    tags: ["vegan", "build-a-recipe"],
    steps: [
      "Take a tortilla or flatbread.",
      "Spread with sauce or dip.",
      "Add cooked or raw veggies and a protein.",
      "Roll tightly and slice to eat."
    ]
  },
  {
    id: 49,
    title: "Rice Bowl Adventure",
    ingredients: 6,
    tags: ["student", "build-a-recipe"],
    steps: [
      "Fill a bowl with cooked rice.",
      "Add a protein (tofu, beans, chicken, or egg).",
      "Top with veggies (fresh, steamed, or roasted).",
      "Drizzle generous sauce or salsa over.",
      "Mix well before eating."
    ]
  },
  {
    id: 50,
    title: "Ultimate Pasta Mix",
    ingredients: 6,
    tags: ["vegetarian", "build-a-recipe"],
    steps: [
      "Boil pasta until al dente.",
      "Stir in pesto or sauce of choice.",
      "Add protein (beans, shredded chicken, tofu, etc.).",
      "Throw in leftover cooked or raw veggies.",
      "Top with cheese or nutritional yeast if desired."
    ]
  },
  {
    id: 51,
    title: "Breakfast Bowl Formula",
    ingredients: 5,
    tags: ["breakfast", "build-a-recipe"],
    steps: [
      "Pick a base (oats, toast, tortilla, potato hash).",
      "Add eggs, tofu, or yogurt.",
      "Toss in fruit, veggies, or both.",
      "Drizzle with honey, hot sauce, or nut butter.",
      "Garnish with seeds or herbs."
    ]
  },
  {
    id: 52,
    title: "Hearty Salad Maker",
    ingredients: 5,
    tags: ["vegan", "build-a-recipe"],
    steps: [
      "Choose a leafy base (spinach, lettuce, kale, arugula).",
      "Add protein like chickpeas, beans, chicken, or tofu.",
      "Pile on various chopped veggies.",
      "Top with nuts, seeds, or croutons.",
      "Dress with vinaigrette or your favorite sauce."
    ]
  },
  {
    id: 53,
    title: "DIY Nacho Plate",
    ingredients: 6,
    tags: ["student", "build-a-recipe"],
    steps: [
      "Layer tortilla chips on a plate.",
      "Scatter your protein pick (beans, ground beef, or tofu).",
      "Sprinkle on toppings (onions, jalapeno, corn).",
      "Drizzle with cheese or vegan cheese sauce.",
      "Microwave until melted, serve with salsa & sour cream."
    ]
  },
  {
    id: 54,
    title: "Super Simple Flatbread Pizza",
    ingredients: 5,
    tags: ["vegetarian", "build-a-recipe"],
    steps: [
      "Spread tomato sauce on flatbread or naan.",
      "Add cheese, cooked veggies, or deli meat/chickpeas.",
      "Top with fresh herbs or greens.",
      "Bake at 425°F until cheese is bubbly and bread crisp."
    ]
  },
  {
    id: 55,
    title: "Instant Stir-Fry",
    ingredients: 5,
    tags: ["vegan", "build-a-recipe"],
    steps: [
      "Heat oil in a pan.",
      "Add chopped veggies and protein of choice.",
      "Sauté for 5-7 minutes.",
      "Pour in sauce, tossing to coat.",
      "Serve over rice or noodles."
    ]
  },
  {
    id: 56,
    title: "Eggs-Your-Way Breakfast",
    ingredients: 4,
    tags: ["breakfast", "build-a-recipe"],
    steps: [
      "Decide: Boiled, scrambled, or fried eggs.",
      "Choose bread/rice as a side.",
      "Add veggies or cheeses as desired.",
      "Serve assembled together."
    ]
  },
  {
    id: 57,
    title: "DIY Buddha Bowl",
    ingredients: 7,
    tags: ["vegan", "build-a-recipe"],
    steps: [
      "Start with a grain (rice, barley, quinoa, couscous).",
      "Add at least one protein.",
      "Top with at least three veggies (cooked or raw).",
      "Include a sauce/dressing and a crunchy topping.",
      "Arrange beautifully, drizzle, and dig in."
    ]
  },
  {
    id: 58,
    title: "Mega Soup Mixer",
    ingredients: 6,
    tags: ["student", "build-a-recipe"],
    steps: [
      "Heat broth in a pot.",
      "Add vegetables (fresh or frozen) and bring to a simmer.",
      "Stir in a protein pick (lentils, tofu, chicken, beans).",
      "Simmer together 10-15 minutes.",
      "Season & serve."
    ]
  },
  {
    id: 59,
    title: "Sandwich Builder",
    ingredients: 5,
    tags: ["vegetarian", "build-a-recipe"],
    steps: [
      "Slice bread of your choice.",
      "Choose a spread (hummus, mayo, mustard, nut butter).",
      "Select protein (tofu, cheese, eggs, beans).",
      "Add veggies (lettuce, tomato, cucumber, pickles).",
      "Assemble in layers and slice."
    ]
  },
  {
    id: 60,
    title: "Pasta Salad Express",
    ingredients: 7,
    tags: ["vegan", "build-a-recipe"],
    steps: [
      "Cook and cool short pasta.",
      "Add protein (beans, chickpeas, tofu).",
      "Toss with chopped veggies.",
      "Add olives or nuts if available.",
      "Coat with vinaigrette and toss to serve."
    ]
  }
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
    // for 'build', don't show cards (wizard instead)
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
      {/* Centered title and below it horizontal navbar */}
      <header className="qbc-header">
        <h1 className="qbc-main-title">Bachelors Cooking</h1>
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
      </header>
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
        <span className="qbc-footer-line">
          Bachelors Cooking &copy; 2025 &mdash; Eat smart, live well
        </span>
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
        .qbc-header {
          background: #FFC107;
          color: #222;
          box-shadow: 0 2px 6px rgba(0,0,0,0.04);
          position: sticky;
          top: 0;
          z-index: 99;
          padding: 0;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .qbc-main-title {
          margin: 0;
          padding-top: 30px;
          font-size: 2.7rem;
          font-weight: 800;
          letter-spacing: 0.01em;
          color: #222;
        }
        .qbc-nav-tabs {
          margin: 19px 0 -2px 0;
          display: flex;
          flex-direction: row;
          justify-content: center;
          gap: 0;
        }
        .qbc-nav-tab {
          background: transparent;
          border: none;
          font-size: 1.08rem;
          font-weight: 600;
          color: #222;
          padding: 13px 32px 9px 32px;
          border-bottom: 4px solid transparent;
          margin: 0;
          transition: border-bottom 0.18s, color 0.17s, background 0.12s;
          cursor: pointer;
          border-radius: 0;
          outline: none;
        }
        .qbc-nav-tab.active, .qbc-nav-tab:hover {
          border-bottom: 4px solid #FF7043;
          color: #FF7043;
          background: rgba(255,193,7,0.10);
        }
        .qbc-tagline {
          margin: 12px 0 8px 0;
          font-size: 1.02rem;
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
          padding: 18px 0 18px 0;
          color: #886006;
          background: #FFF8E1;
          font-size: 1.02rem;
          line-height: 1.6;
          margin-top: auto;
          font-weight: 500;
          letter-spacing: 0.01em;
          border-top: 1.5px solid #FFECB3;
          box-shadow: 0 -2px 8px #fff7e1;
        }
        .qbc-footer-line {
          color: #A98109;
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
 * @param {object} props - title, ingredient count, tags array, steps array (NO IMAGE)
 */
// PUBLIC_INTERFACE
function RecipeCard({ title, ingredients, tags, steps }) {
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
        {/* Step-by-step procedure */}
        {steps && steps.length > 0 && (
          <div className="qbc-card-steps-section">
            <div className="qbc-card-steps-label">Preparation Steps:</div>
            <ol className="qbc-card-steps-list">
              {steps.map((step, i) => (
                <li key={i} className="qbc-card-step-item">{step}</li>
              ))}
            </ol>
          </div>
        )}
      </div>
      {/* Inline styles specific for steps UI in card (yellow theme, ordered clarity) */}
      <style>{`
        .qbc-card-steps-section {
          margin-top: 20px;
          background: #FFFDE1;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 0.97rem;
          color: #886006;
          box-shadow: 0 1px 2px #ffd76b33;
        }
        .qbc-card-steps-label {
          font-weight: 600;
          color: #FFC107;
          margin-bottom: 6px;
          font-size: 1.01rem;
        }
        .qbc-card-steps-list {
          margin: 0;
          padding-left: 23px;
        }
        .qbc-card-step-item {
          margin-bottom: 9px;
          line-height: 1.44;
        }
      `}</style>
    </div>
  );
}

export default QuickBiteMainContainer;
