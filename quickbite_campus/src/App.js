import React, { useState, useMemo } from 'react';
import './App.css';

// Theme colors for Bachelor Cooking (yellow-centric)
const COLORS = {
  primary: '#FFC107',
  secondary: '#FF7043',
  accent: '#333',
  background: '#FFFDEB',
  text: '#232323',
  tagBg: '#FFF9E3',
};

// 15 sample recipes for each section, with full detail.
// (sample recipes are diverse, simple, and concise for brevity.)

const FIVE_INGREDIENT_RECIPES = [
  {
    title: "Cheesy Garlic Pasta",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847efc4?auto=compress&fit=crop&w=300&q=80",
    tags: ["vegetarian", "student-friendly"],
    ingredientCount: 5,
    ingredients: [
      "200g pasta",
      "2 cloves garlic",
      "40g butter",
      "50g grated cheese",
      "Salt"
    ],
    steps: [
      "Cook pasta in salted water and drain.",
      "Melt butter in a pan, sauté minced garlic.",
      "Toss cooked pasta into garlic butter.",
      "Add grated cheese, mix until melted.",
      "Serve warm."
    ]
  },
  {
    title: "Quick Egg Fried Rice",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=compress&fit=crop&w=300&q=80",
    tags: ["quick", "budget"],
    ingredientCount: 5,
    ingredients: [
      "2 cups cooked rice",
      "2 eggs",
      "1/2 cup frozen peas",
      "2 tbsp soy sauce",
      "2 tbsp oil"
    ],
    steps: [
      "Heat oil in a pan, scramble eggs.",
      "Add peas and cook 1 min.",
      "Add cooked rice and stir well.",
      "Drizzle soy sauce and toss.",
      "Serve hot."
    ]
  },
  {
    title: "One-pan Chili Nachos",
    image: "https://images.unsplash.com/photo-1519852476563-cb2f6f051eef?auto=compress&fit=crop&w=300&q=80",
    tags: ["snack", "student"],
    ingredientCount: 5,
    ingredients: [
      "Tortilla chips",
      "1 can chili beans",
      "1 cup shredded cheese",
      "Jalapeños",
      "Green onions"
    ],
    steps: [
      "Spread chips on a baking tray.",
      "Top with chili beans and cheese.",
      "Add jalapeños as desired.",
      "Bake at 180°C for 8 min.",
      "Garnish with chopped onions."
    ]
  },
  {
    title: "Avocado Toast Deluxe",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
    tags: ["vegetarian", "breakfast"],
    ingredientCount: 5,
    ingredients: [
      "2 slices bread",
      "1 avocado",
      "Lemon juice",
      "Salt and pepper",
      "Chili flakes"
    ],
    steps: [
      "Toast bread slices.",
      "Smash avocado, mix in lemon, salt & pepper.",
      "Spread avocado mixture on toast.",
      "Sprinkle chili flakes.",
      "Serve immediately."
    ]
  },
  {
    title: "Sausage and Tomato Skillet",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
    tags: ["meat", "quick"],
    ingredientCount: 5,
    ingredients: [
      "2 sausages",
      "2 tomatoes",
      "1/2 onion",
      "Oil",
      "Salt"
    ],
    steps: [
      "Slice sausages and onions, dice tomatoes.",
      "Heat oil ,sauté onions and sausages.",
      "Add tomatoes and cook until soft.",
      "Season with salt.",
      "Serve warm."
    ]
  },
  {
    title: "Grilled Cheese & Tomato Soup",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=compress&fit=crop&w=300&q=80",
    tags: ["comfort", "vegetarian"],
    ingredientCount: 5,
    ingredients: [
      "2 slices bread",
      "2 slices cheese",
      "Butter",
      "1 can tomato soup",
      "Water"
    ],
    steps: [
      "Assemble cheese sandwich, butter outside.",
      "Grill until golden brown.",
      "Heat soup with water as needed.",
      "Serve sandwich with hot soup.",
      "Enjoy!"
    ]
  },
  {
    title: "Microwave Mug Omelette",
    image: "https://images.unsplash.com/photo-1429554429301-01bcd64c6eab?auto=compress&fit=crop&w=300&q=80",
    tags: ["microwave", "breakfast"],
    ingredientCount: 5,
    ingredients: [
      "2 eggs",
      "2 tbsp milk",
      "Handful spinach",
      "Cheese",
      "Salt & pepper"
    ],
    steps: [
      "Whisk eggs, milk, salt & pepper in microwave mug.",
      "Add torn spinach, cheese.",
      "Microwave for 1 minute.",
      "Stir; microwave 30 sec.",
      "Eat from mug."
    ]
  },
  {
    title: "Baked Potato Snack",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=compress&fit=crop&w=300&q=80",
    tags: ["potato", "snack"],
    ingredientCount: 5,
    ingredients: [
      "1 large potato",
      "Oil",
      "Cheese",
      "Chives",
      "Salt"
    ],
    steps: [
      "Pierce potato, rub with oil & salt.",
      "Bake 45 min at 200°C.",
      "Cut open, top with cheese.",
      "Bake until cheese melts.",
      "Sprinkle chives."
    ]
  },
  {
    title: "Easy Chicken Wrap",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
    tags: ["chicken", "lunch"],
    ingredientCount: 5,
    ingredients: [
      "1 tortilla",
      "Cooked chicken",
      "Lettuce",
      "Mayonnaise",
      "Tomato"
    ],
    steps: [
      "Spread mayo on tortilla.",
      "Layer lettuce, chicken, tomato slices.",
      "Roll tightly.",
      "Cut in half.",
      "Serve cold or warm."
    ]
  },
  {
    title: "Veggie Stir-Fry Express",
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=compress&fit=crop&w=300&q=80",
    tags: ["veggies", "quick"],
    ingredientCount: 5,
    ingredients: [
      "Mixed vegetables",
      "Soy sauce",
      "Ginger (ground)",
      "Oil",
      "Rice"
    ],
    steps: [
      "Cook rice as per instructions.",
      "Heat oil, sauté vegetables.",
      "Add ginger, stir for 1 min.",
      "Toss with soy sauce.",
      "Serve over rice."
    ]
  },
  {
    title: "Simple Tuna Salad",
    image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=compress&fit=crop&w=300&q=80",
    tags: ["tuna", "salad"],
    ingredientCount: 5,
    ingredients: [
      "1 can tuna",
      "1 tbsp mayo",
      "Lettuce",
      "Cucumber",
      "Salt & pepper"
    ],
    steps: [
      "Mix tuna with mayo, salt & pepper.",
      "Chop lettuce, cucumber, add to bowl.",
      "Top with tuna mixture.",
      "Toss together.",
      "Serve chilled."
    ]
  },
  {
    title: "Peanut Butter Banana Toast",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=compress&fit=crop&w=300&q=80",
    tags: ["breakfast", "vegetarian"],
    ingredientCount: 5,
    ingredients: [
      "2 slices bread",
      "Peanut butter",
      "1 banana",
      "Honey",
      "Cinnamon"
    ],
    steps: [
      "Toast bread.",
      "Spread peanut butter.",
      "Slice banana, place on toast.",
      "Drizzle honey, sprinkle cinnamon.",
      "Done."
    ]
  },
  {
    title: "5-Minute Bean Quesadilla",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
    tags: ["microwave", "vegetarian"],
    ingredientCount: 5,
    ingredients: [
      "Tortilla",
      "Refried beans",
      "Cheese",
      "Salsa",
      "Oil"
    ],
    steps: [
      "Spread beans on half tortilla.",
      "Top with cheese, salsa.",
      "Fold in half.",
      "Microwave/Grill until warm.",
      "Serve."
    ]
  },
  {
    title: "Sweetcorn Fritter Bites",
    image: "https://images.unsplash.com/photo-1519852476563-cb2f6f051eef?auto=compress&fit=crop&w=300&q=80",
    tags: ["snack", "corn"],
    ingredientCount: 5,
    ingredients: [
      "Sweetcorn",
      "Egg",
      "Flour",
      "Spring onion",
      "Salt"
    ],
    steps: [
      "Mix sweetcorn, beaten egg, flour, and salt.",
      "Stir in chopped onions.",
      "Spoon mixture onto hot oiled pan.",
      "Fry both sides until golden.",
      "Serve hot."
    ]
  },
  {
    title: "Fruit Yogurt Parfait",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
    tags: ["breakfast", "vegetarian"],
    ingredientCount: 5,
    ingredients: [
      "Greek yogurt",
      "Mixed fruit",
      "Granola",
      "Honey",
      "Chia seeds"
    ],
    steps: [
      "Add yogurt to glass.",
      "Layer with fruit, granola.",
      "Drizzle honey.",
      "Sprinkle chia seeds.",
      "Serve cold."
    ]
  },
  {
    title: "Easy Tomato Bruschetta",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=compress&fit=crop&w=300&q=80",
    tags: ["snack", "vegetarian"],
    ingredientCount: 5,
    ingredients: [
      "Baguette",
      "Tomatoes",
      "Garlic",
      "Olive oil",
      "Basil"
    ],
    steps: [
      "Slice baguette, toast.",
      "Dice tomatoes, mix with olive oil, basil.",
      "Rub garlic on toast.",
      "Top with tomato mix.",
      "Serve."
    ]
  },
];

const STUDENT_MEALS = [
  {
    title: "Microwave Veggie Quesadilla",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?auto=compress&fit=crop&w=300&q=80",
    tags: ["vegetarian", "microwave"],
    ingredientCount: 6,
    ingredients: [
      "Tortilla",
      "Mixed vegetables",
      "Grated cheese",
      "Salsa",
      "Oil",
      "Salt"
    ],
    steps: [
      "Spread veggies and cheese on half tortilla.",
      "Fold and seal edge.",
      "Microwave for 1-2 min.",
      "Open, add salsa.",
      "Slice and enjoy."
    ]
  },
  {
    title: "No-Cook Overnight Oats",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=compress&fit=crop&w=300&q=80",
    tags: ["no-cook", "healthy", "breakfast"],
    ingredientCount: 5,
    ingredients: [
      "1 cup oats",
      "Milk (dairy/plant)",
      "Honey",
      "Chia seeds",
      "Fruit"
    ],
    steps: [
      "Combine oats, milk, honey, chia in jar.",
      "Stir well.",
      "Top with fruit.",
      "Refrigerate overnight.",
      "Eat cold."
    ]
  },
  {
    title: "Instant Noodle Stir-Fry",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=compress&fit=crop&w=300&q=80",
    tags: ["quick", "budget"],
    ingredientCount: 6,
    ingredients: [
      "Instant noodles",
      "Mixed vegetables",
      "Soy sauce",
      "Egg",
      "Oil",
      "Hot sauce"
    ],
    steps: [
      "Boil noodles, drain.",
      "Heat oil, cook veggies.",
      "Add noodles, soy sauce.",
      "Crack in egg, scramble in.",
      "Add hot sauce as desired, stir & serve."
    ]
  },
  {
    title: "Easy Chicken Wrap",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
    tags: ["chicken", "lunch"],
    ingredientCount: 5,
    ingredients: [
      "1 tortilla",
      "Cooked chicken",
      "Lettuce",
      "Mayonnaise",
      "Tomato",
    ],
    steps: [
      "Spread mayo on tortilla.",
      "Layer lettuce, chicken, tomato slices.",
      "Roll tightly.",
      "Cut in half.",
      "Serve cold or warm."
    ]
  },
  {
    title: "Ramen Carbonara",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847efc4?auto=compress&fit=crop&w=300&q=80",
    tags: ["ramen", "fusion"],
    ingredientCount: 6,
    ingredients: [
      "1 ramen packet",
      "Bacon or ham",
      "Egg",
      "Parmesan cheese",
      "Black pepper",
      "Green onions"
    ],
    steps: [
      "Cook ramen, drain most water.",
      "Add beaten egg, stir rapidly.",
      "Add chopped bacon, cheese.",
      "Mix well over low heat.",
      "Top with pepper, onions."
    ]
  },
  {
    title: "Sheet Pan Sausage & Veggies",
    image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=compress&fit=crop&w=300&q=80",
    tags: ["bake", "easy"],
    ingredientCount: 6,
    ingredients: [
      "Sausages",
      "Bell peppers",
      "Potatoes",
      "Onion",
      "Oil",
      "Salt & pepper"
    ],
    steps: [
      "Chop veggies, toss with oil & seasoning.",
      "Slice sausages, add to tray.",
      "Arrange on sheet pan.",
      "Bake 25 min at 200°C.",
      "Serve warm."
    ]
  },
  {
    title: "Tuna Mayo Rice Bowl",
    image: "https://images.unsplash.com/photo-1523987355523-c7b5b0723cdd?auto=compress&fit=crop&w=300&q=80",
    tags: ["no-cook", "student"],
    ingredientCount: 5,
    ingredients: [
      "1 can tuna",
      "Cooked rice",
      "Mayonnaise",
      "Soy sauce",
      "Cucumber"
    ],
    steps: [
      "Drain tuna, mix with mayo.",
      "Scoop rice into bowl.",
      "Top with tuna mix.",
      "Drizzle soy sauce.",
      "Garnish with cucumber."
    ]
  },
  {
    title: "Quick Lentil Soup",
    image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=compress&fit=crop&w=300&q=80",
    tags: ["soup", "vegetarian"],
    ingredientCount: 6,
    ingredients: [
      "1 cup lentils",
      "Carrot",
      "Onion",
      "Stock cube",
      "Oil",
      "Spices"
    ],
    steps: [
      "Chop veggies.",
      "Sauté onion & carrot in oil.",
      "Add lentils, stock, spices.",
      "Add water, boil, simmer 25 min.",
      "Blend if desired."
    ]
  },
  {
    title: "Spicy Chickpea Sandwich",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
    tags: ["vegetarian", "lunch"],
    ingredientCount: 6,
    ingredients: [
      "Bread",
      "1 can chickpeas",
      "Sriracha or chili sauce",
      "Lettuce",
      "Lemon juice",
      "Salt"
    ],
    steps: [
      "Smash chickpeas in bowl.",
      "Mix with sriracha, lemon, salt.",
      "Spread mixture on bread.",
      "Top with lettuce.",
      "Serve."
    ]
  },
  {
    title: "Sriracha Tuna Wrap",
    image: "https://images.unsplash.com/photo-1519852476563-cb2f6f051eef?auto=compress&fit=crop&w=300&q=80",
    tags: ["tuna", "wrap"],
    ingredientCount: 6,
    ingredients: [
      "Tortilla",
      "1 can tuna",
      "Mayonnaise",
      "Sriracha",
      "Carrot",
      "Lettuce"
    ],
    steps: [
      "Mix tuna, mayo, sriracha.",
      "Grate carrot, chop lettuce.",
      "Spread mixture, top with veg.",
      "Roll well.",
      "Slice & enjoy."
    ]
  },
  {
    title: "Easy Microwave Mac & Cheese",
    image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
    tags: ["microwave", "student"],
    ingredientCount: 5,
    ingredients: [
      "Macaroni",
      "Milk",
      "Cheddar cheese",
      "Butter",
      "Salt"
    ],
    steps: [
      "Combine macaroni & milk in microwave-safe bowl.",
      "Microwave in intervals until soft.",
      "Mix in butter & cheese.",
      "Stir until melted.",
      "Serve hot."
    ]
  },
  {
    title: "Veggie Bagel Sandwich",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
    tags: ["vegetarian", "quick"],
    ingredientCount: 6,
    ingredients: [
      "Bagel",
      "Cream cheese",
      "Cucumber",
      "Carrot",
      "Lettuce",
      "Salt & pepper"
    ],
    steps: [
      "Slice bagel, spread cream cheese.",
      "Layer with sliced cucumber, carrot, lettuce.",
      "Season to taste.",
      "Close sandwich.",
      "Eat fresh."
    ]
  },
  {
    title: "Spicy Peanut Noodles",
    image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=compress&fit=crop&w=300&q=80",
    tags: ["no-cook", "spicy"],
    ingredientCount: 5,
    ingredients: [
      "Instant noodles",
      "Peanut butter",
      "Soy sauce",
      "Chili flakes",
      "Green onions"
    ],
    steps: [
      "Cook noodles, drain.",
      "Mix peanut butter, soy, chili to make sauce.",
      "Toss noodles in sauce.",
      "Top with onions.",
      "Serve."
    ]
  },
  {
    title: "Easy Pizza Toast",
    image: "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=compress&fit=crop&w=300&q=80",
    tags: ["vegetarian", "snack"],
    ingredientCount: 5,
    ingredients: [
      "Bread",
      "Tomato sauce",
      "Cheese",
      "Bell pepper",
      "Oregano"
    ],
    steps: [
      "Spread sauce on bread.",
      "Top with cheese and peppers.",
      "Sprinkle oregano.",
      "Bake/microwave until cheese melts.",
      "Enjoy."
    ]
  },
  {
    title: "Egg & Veggie Mug Scramble",
    image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
    tags: ["microwave", "breakfast"],
    ingredientCount: 5,
    ingredients: [
      "2 eggs",
      "Spinach",
      "Cherry tomatoes",
      "Milk",
      "Salt & pepper"
    ],
    steps: [
      "Beat eggs, milk, salt/pepper in mug.",
      "Add spinach and tomatoes.",
      "Microwave for 1 min.",
      "Stir & microwave 30 sec.",
      "Serve in mug."
    ]
  },
  {
    title: "Banana Pancakes (No Baking Powder)",
    image: "https://images.unsplash.com/photo-1519864600265-abb23847efc4?auto=compress&fit=crop&w=300&q=80",
    tags: ["breakfast", "vegan"],
    ingredientCount: 5,
    ingredients: [
      "1 banana",
      "Oats",
      "Plant milk",
      "Maple syrup",
      "Salt"
    ],
    steps: [
      "Mash banana, blend with oats and salt.",
      "Add plant milk to form batter.",
      "Spoon onto nonstick pan.",
      "Cook both sides.",
      "Drizzle maple syrup."
    ]
  },
];

const VEGAN_PROTEINS = [
  {
    protein: "Tofu",
    recipes: [
      {
        title: "Crispy Tofu Bites",
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "tofu"],
        ingredientCount: 5,
        ingredients: [
          "Firm tofu",
          "Cornstarch",
          "Soy sauce",
          "Oil",
          "Garlic powder"
        ],
        steps: [
          "Cut tofu into cubes.",
          "Toss with soy sauce, garlic powder.",
          "Dust with cornstarch.",
          "Pan-fry until crispy.",
          "Serve hot."
        ]
      },
      {
        title: "Tofu Stir-Fry",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "tofu"],
        ingredientCount: 5,
        ingredients: [
          "Tofu",
          "Broccoli",
          "Soy sauce",
          "Oil",
          "Sesame seeds"
        ],
        steps: [
          "Pan-fry tofu until golden.",
          "Add broccoli, cook 4 min.",
          "Add soy sauce and sesame.",
          "Toss together.",
          "Serve with rice."
        ]
      },
      {
        title: "Sweet & Sour Tofu",
        image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "tofu", "asian"],
        ingredientCount: 5,
        ingredients: [
          "Tofu",
          "Bell pepper",
          "Pineapple",
          "Sweet & sour sauce",
          "Oil"
        ],
        steps: [
          "Cook tofu in oil until crisp.",
          "Add bell pepper, sauté 1 min.",
          "Add pineapple, toss.",
          "Pour in sauce, heat through.",
          "Serve."
        ]
      },
      {
        title: "Tofu & Peanut Noodles",
        image: "https://images.unsplash.com/photo-1506354666786-959d6d497f1a?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "tofu"],
        ingredientCount: 5,
        ingredients: [
          "Tofu",
          "Noodles",
          "Peanut butter",
          "Soy sauce",
          "Cucumber"
        ],
        steps: [
          "Cook noodles.",
          "Sauté tofu cubes.",
          "Mix peanut butter with soy sauce to make sauce.",
          "Combine all with cucumber strips.",
          "Serve cold."
        ]
      },
      {
        title: "Tofu Breakfast Scramble",
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "breakfast"],
        ingredientCount: 5,
        ingredients: [
          "Tofu",
          "Turmeric",
          "Spinach",
          "Tomato",
          "Salt & pepper"
        ],
        steps: [
          "Mash tofu, cook with turmeric.",
          "Add spinach, cook 2 min.",
          "Add diced tomatoes.",
          "Season to taste.",
          "Serve hot."
        ]
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
        ingredientCount: 6,
        ingredients: [
          "Cooked lentils",
          "Tomato sauce",
          "Onion",
          "Garlic",
          "Burger bun",
          "Paprika"
        ],
        steps: [
          "Cook onions and garlic.",
          "Add lentils, tomato sauce, paprika.",
          "Simmer 8 mins.",
          "Scoop onto buns.",
          "Eat warm."
        ]
      },
      {
        title: "Lentil Rice Bowl",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "lentils"],
        ingredientCount: 5,
        ingredients: [
          "Lentils",
          "Rice",
          "Cucumber",
          "Lemon juice",
          "Salt"
        ],
        steps: [
          "Cook rice, lentils.",
          "Mix lentils with lemon and salt.",
          "Serve over rice.",
          "Top with cucumber.",
          "Enjoy."
        ]
      },
      {
        title: "Curried Lentil Soup",
        image: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "lentils", "soup"],
        ingredientCount: 6,
        ingredients: [
          "Lentils",
          "Carrot",
          "Curry powder",
          "Stock cube",
          "Onion",
          "Oil"
        ],
        steps: [
          "Heat oil, add onion/carrot.",
          "Stir in curry powder.",
          "Add lentils, stock, water.",
          "Simmer 25 min.",
          "Serve warm."
        ]
      },
      {
        title: "Lentil Tacos",
        image: "https://images.unsplash.com/photo-1519852476563-cb2f6f051eef?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "lentils"],
        ingredientCount: 5,
        ingredients: [
          "Cooked lentils",
          "Taco shells",
          "Salsa",
          "Lettuce",
          "Corn"
        ],
        steps: [
          "Warm lentils and corn.",
          "Fill taco shells.",
          "Top with salsa.",
          "Add lettuce.",
          "Serve."
        ]
      },
      {
        title: "Easy Lentil Stew",
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "lentils", "stew"],
        ingredientCount: 5,
        ingredients: [
          "Lentils",
          "Tomato paste",
          "Potato",
          "Carrot",
          "Spices"
        ],
        steps: [
          "Chop and cook potato, carrot.",
          "Add lentils, tomato paste.",
          "Add water, spices.",
          "Simmer until soft.",
          "Serve hot."
        ]
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
        ingredientCount: 5,
        ingredients: [
          "Seitan",
          "Soy sauce",
          "Bell pepper",
          "Oil",
          "Rice"
        ],
        steps: [
          "Slice seitan & bell pepper.",
          "Sauté seitan in oil.",
          "Add bell pepper, cook 3 min.",
          "Add soy sauce.",
          "Serve with rice."
        ]
      },
      {
        title: "BBQ Seitan Sandwich",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "seitan"],
        ingredientCount: 5,
        ingredients: [
          "Seitan",
          "BBQ sauce",
          "Onion",
          "Bread roll",
          "Spinach"
        ],
        steps: [
          "Shred seitan, mix with BBQ sauce.",
          "Cook in pan with sliced onion.",
          "Pile on bread roll.",
          "Top with spinach.",
          "Serve."
        ]
      },
      {
        title: "Seitan 'Chicken' Salad",
        image: "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "seitan"],
        ingredientCount: 5,
        ingredients: [
          "Seitan",
          "Lettuce",
          "Cherry tomatoes",
          "Vegan mayo",
          "Cucumber"
        ],
        steps: [
          "Tear seitan, toss with mayo.",
          "Chop lettuce, tomatoes, cucumber.",
          "Combine in bowl.",
          "Mix well.",
          "Serve."
        ]
      },
      {
        title: "Stir-fried Seitan & Broccoli",
        image: "https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "seitan"],
        ingredientCount: 5,
        ingredients: [
          "Seitan",
          "Broccoli",
          "Soy sauce",
          "Garlic",
          "Oil"
        ],
        steps: [
          "Chop broccoli, fry in oil.",
          "Add sliced seitan.",
          "Add garlic, soy sauce.",
          "Cook together 4 min.",
          "Serve hot."
        ]
      },
      {
        title: "Simple Seitan Curry",
        image: "https://images.unsplash.com/photo-1519852476563-cb2f6f051eef?auto=compress&fit=crop&w=300&q=80",
        tags: ["vegan", "seitan", "curry"],
        ingredientCount: 5,
        ingredients: [
          "Seitan",
          "Curry paste",
          "Coconut milk",
          "Carrot",
          "Rice"
        ],
        steps: [
          "Sauté carrot and seitan.",
          "Add curry paste.",
          "Pour in coconut milk.",
          "Simmer 10 min.",
          "Serve over rice."
        ]
      }
    ]
  }
];

// Expand for total of 15 vegan recipes (5 per protein, 3 proteins shown)

const BUILD_A_RECIPE_TEMPLATES = [
  {
    title: "Pasta Primavera",
    ingredients: [
      "Pasta",
      "Bell pepper",
      "Broccoli",
      "Olive oil",
      "Parmesan"
    ],
    steps: [
      "Boil pasta, drain.",
      "Sauté broccoli and bell pepper in oil.",
      "Mix veggies with pasta.",
      "Top with parmesan.",
      "Serve."
    ]
  },
  {
    title: "Chickpea Rice Bowl",
    ingredients: [
      "Rice",
      "Chickpeas",
      "Spinach",
      "Tomato",
      "Cumin"
    ],
    steps: [
      "Cook rice.",
      "Sauté chickpeas with cumin.",
      "Toss with spinach, tomato.",
      "Serve over rice.",
      "Enjoy."
    ]
  },
  {
    title: "Avocado Toast Deluxe",
    ingredients: [
      "Bread",
      "Avocado",
      "Lemon juice",
      "Tomato",
      "Salt & pepper"
    ],
    steps: [
      "Toast bread.",
      "Mash avocado with lemon, salt & pepper.",
      "Spread avocado on bread.",
      "Top with tomato.",
      "Serve."
    ]
  },
  {
    title: "Egg Fried Rice Simple",
    ingredients: [
      "Rice",
      "Egg",
      "Scallion",
      "Soy sauce",
      "Oil"
    ],
    steps: [
      "Cook rice.",
      "Scramble egg, add rice.",
      "Add scallion, soy sauce.",
      "Stir-fry until aromatic.",
      "Serve."
    ]
  },
  {
    title: "Hearty Lentil Soup",
    ingredients: [
      "Lentils",
      "Carrot",
      "Celery",
      "Stock cube",
      "Pepper"
    ],
    steps: [
      "Chop carrot, celery.",
      "Boil with lentils, stock.",
      "Add pepper.",
      "Simmer until soft.",
      "Eat hot."
    ]
  },
  {
    title: "Veggie Stir-Fry Bowl",
    ingredients: [
      "Noodles",
      "Carrot",
      "Mushroom",
      "Soy sauce",
      "Tofu"
    ],
    steps: [
      "Cook noodles.",
      "Sauté mushroom, carrot.",
      "Add tofu cubes.",
      "Add noodles, soy sauce.",
      "Stir and serve."
    ]
  },
  {
    title: "Tofu Wrap",
    ingredients: [
      "Tortilla",
      "Tofu",
      "Lettuce",
      "Mayonnaise",
      "Sriracha"
    ],
    steps: [
      "Sauté tofu.",
      "Mix tofu with mayo, sriracha.",
      "Place lettuce on tortilla.",
      "Top with tofu mix.",
      "Roll up and eat."
    ]
  },
  {
    title: "Quick Pita Pizza",
    ingredients: [
      "Pita bread",
      "Tomato sauce",
      "Cheese",
      "Spinach",
      "Oregano"
    ],
    steps: [
      "Spread sauce on pita.",
      "Scatter cheese, spinach.",
      "Sprinkle oregano.",
      "Bake 7 min.",
      "Slice and eat."
    ]
  },
  {
    title: "Simple Tuna Salad",
    ingredients: [
      "Tuna",
      "Cucumber",
      "Lettuce",
      "Mayo",
      "Pepper"
    ],
    steps: [
      "Drain tuna.",
      "Mix with mayo, pepper.",
      "Chop cucumber, lettuce.",
      "Combine all.",
      "Serve chilled."
    ]
  },
  {
    title: "Sweetcorn Fritters",
    ingredients: [
      "Sweetcorn",
      "Egg",
      "Flour",
      "Chili flakes",
      "Salt"
    ],
    steps: [
      "Mix all ingredients.",
      "Spoon onto hot pan.",
      "Fry both sides.",
      "Cool slightly.",
      "Eat hot."
    ]
  },
  {
    title: "Breakfast Yogurt Parfait",
    ingredients: [
      "Greek yogurt",
      "Granola",
      "Mixed fruit",
      "Honey",
      "Chia seeds"
    ],
    steps: [
      "Add yogurt to glass.",
      "Top with granola, fruit.",
      "Drizzle honey.",
      "Sprinkle chia seeds.",
      "Serve cold."
    ]
  },
  {
    title: "Omelette Wrap",
    ingredients: [
      "Egg",
      "Tortilla",
      "Tomato",
      "Cheese",
      "Spinach"
    ],
    steps: [
      "Beat egg, cook with tomato & spinach.",
      "Add cheese.",
      "Place omelette on tortilla.",
      "Roll up.",
      "Eat hot."
    ]
  },
  {
    title: "Potato Skillet Hash",
    ingredients: [
      "Potatoes",
      "Peppers",
      "Onion",
      "Oil",
      "Paprika"
    ],
    steps: [
      "Dice & boil potatoes.",
      "Sauté onions, peppers.",
      "Add potatoes, paprika.",
      "Fry until golden.",
      "Serve warm."
    ]
  },
  {
    title: "Chili Bean Nachos",
    ingredients: [
      "Tortilla chips",
      "Chili beans",
      "Cheese",
      "Jalapeños",
      "Green onions"
    ],
    steps: [
      "Spread chips on tray.",
      "Add chili beans, cheese.",
      "Bake until cheese melts.",
      "Top with jalapeños, onions.",
      "Eat hot."
    ]
  },
  {
    title: "Creamy Avocado Pasta",
    ingredients: [
      "Pasta",
      "Avocado",
      "Garlic",
      "Lime juice",
      "Olive oil"
    ],
    steps: [
      "Cook pasta, drain.",
      "Mash avocado, garlic, lime, oil to make sauce.",
      "Mix sauce with pasta.",
      "Season to taste.",
      "Serve."
    ]
  },
];

// UI Components

function RecipeCard({ recipe, onViewDetails }) {
  // No image rendered: Only title, ingredient count, tags, and up to first few ingredients
  return (
    <div style={{
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 2px 8px 0 #0001",
      overflow: "hidden",
      width: 250,
      margin: "0 10px 24px 0",
      display: "inline-block",
      verticalAlign: "top",
      cursor: "pointer",
      border: "1.5px solid #ffc10722"
    }} onClick={onViewDetails}>
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
          {recipe.ingredientCount || (recipe.ingredients && recipe.ingredients.length)} ingredients
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 4 }}>
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
        {/* Show brief list of 2-3 first ingredients */}
        {recipe.ingredients &&
          <div style={{ fontSize: 13, color: "#222", margin: "6px 0 0 0" }}>
            {recipe.ingredients.slice(0, 2).join(', ')}
            {recipe.ingredients.length > 2 && ', ...'}
          </div>
        }
      </div>
    </div>
  );
}

// Details Modal for full ingredients and steps
function RecipeDetailsModal({ recipe, open, onClose }) {
  if (!recipe || !open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(0,0,0,0.32)",
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
      onClick={onClose}
      tabIndex={-1}
    >
      <div
        style={{
          minWidth: 320,
          maxWidth: 400,
          width: "96vw",
          background: "#fff",
          borderRadius: 14,
          boxShadow: "0 6px 32px 2px #0005",
          padding: 26,
          position: "relative"
        }}
        onClick={e => e.stopPropagation()}  // Don't close modal on content click
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 8,
            right: 13,
            background: "none",
            border: "none",
            fontSize: 26,
            color: "#C08600",
            cursor: "pointer"
          }}
          title="Close"
        >×</button>
        {/* No image shown here */}
        <div style={{ fontWeight: 700, fontSize: 21, color: COLORS.primary, marginBottom: 3 }}>
          {recipe.title}
        </div>
        {recipe.tags && recipe.tags.length > 0 &&
          <div style={{ marginBottom: 8 }}>
            {recipe.tags.map((tag, idx) =>
              <span key={idx} style={{
                display: "inline-block",
                background: COLORS.tagBg,
                color: COLORS.accent,
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                padding: "1.5px 8px",
                marginRight: 4
              }}>{tag}</span>
            )}
          </div>
        }
        <div style={{ margin: "10px 0 11px", color: "#212", fontSize: 15 }}>
          <strong>Ingredients:</strong>
          <ul style={{ marginTop: 5, marginBottom: 14 }}>
            {recipe.ingredients && recipe.ingredients.map((it, idx) =>
              <li key={idx}>{it}</li>
            )}
          </ul>
        </div>
        <div style={{ color: "#666", fontSize: 15, lineHeight: 1.45 }}>
          <strong>Steps:</strong>
          <ol style={{ marginTop: 6 }}>
            {recipe.steps && recipe.steps.map((it, idx) =>
              <li key={idx} style={{ marginBottom: 4 }}>{it}</li>
            )}
          </ol>
        </div>
      </div>
    </div>
  );
}

// Section view for a recipe list or plant-based grouping
function RecipeSection({ section, searchTerm }) {
  // For modal details
  const [modalRecipe, setModalRecipe] = useState(null);

  // vegan section: group by protein
  if (section.groupByProtein && section.proteinCategories) {
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
                <RecipeCard
                  key={idx}
                  recipe={recipe}
                  onViewDetails={() => setModalRecipe(recipe)}
                />
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
        <RecipeDetailsModal recipe={modalRecipe} open={!!modalRecipe} onClose={() => setModalRecipe(null)} />
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
          <RecipeCard
            key={idx}
            recipe={recipe}
            onViewDetails={() => setModalRecipe(recipe)}
          />
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
      <RecipeDetailsModal recipe={modalRecipe} open={!!modalRecipe} onClose={() => setModalRecipe(null)} />
    </div>
  );
}

// Wizard for Build-a-Recipe feature; also display 15 templates per requirements
function BuildARecipe() {
  // "Show templates" tab, and user builder tab
  const [tab, setTab] = useState('builder'); // 'builder' or 'templates'
  // form states
  const [step, setStep] = useState(0);
  const [base, setBase] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [diet, setDiet] = useState('');
  const [showResult, setShowResult] = useState(false);

  // Demo options (same as before)
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

  function reset() {
    setStep(0);
    setBase('');
    setIngredients([]);
    setDiet('');
    setShowResult(false);
  }
  // Demo generated recipe
  const generatedRecipe = useMemo(() => {
    return {
      title: `${base}${ingredients.length ? ' with ' + ingredients.join(' & ') : ''}`.trim(),
      ingredients: [base, ...ingredients],
      steps: [
        `Start with the base: ${base}.`,
        ingredients.length ? `Add: ${ingredients.join(', ')}.` : "",
        diet ? `Ensure the dish suits: ${diet}.` : "",
        "Mix or assemble as desired.",
        "Season to your taste and enjoy!"
      ].filter(Boolean)
    };
  }, [base, ingredients, diet]);

  return (
    <div>
      <div className="subtitle" style={{ color: COLORS.primary }}>
        Customize Your Meal
      </div>
      <div style={{
        display: "flex",
        gap: 4,
        margin: "8px 0 20px"
      }}>
        <button
          className="btn"
          style={{ background: tab === 'builder' ? COLORS.primary : "#eee", color: tab === 'builder' ? "#222" : "#222" }}
          onClick={() => setTab('builder')}
        >Build Custom Recipe</button>
        <button
          className="btn"
          style={{ background: tab === 'templates' ? COLORS.primary : "#eee", color: tab === 'templates' ? "#222" : "#222" }}
          onClick={() => setTab('templates')}
        >Sample Templates</button>
      </div>
      {tab === 'templates' ? (
        <div>
          <div className="description" style={{ marginBottom: 16 }}>
            Try these 15 ready-to-customize templates for idea inspiration:
          </div>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {BUILD_A_RECIPE_TEMPLATES.map((tpl, i) => (
              <RecipeCard
                key={i}
                recipe={{
                  ...tpl,
                  image: null,
                  tags: ['template'],
                  ingredientCount: tpl.ingredients.length
                }}
                onViewDetails={() => setShowResult(i + 1000)}
              />
            ))}
          </div>
          {/* Modal for template details */}
          {typeof showResult === 'number' && showResult >= 1000 && (
            <RecipeDetailsModal
              recipe={BUILD_A_RECIPE_TEMPLATES[showResult - 1000]}
              open={true}
              onClose={() => setShowResult(false)}
            />
          )}
        </div>
      ) : (
        !showResult ? (
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
            boxShadow: "0 2px 8px #0001",
          }}>
            <div style={{ marginBottom: 24, textAlign: "center" }}>
              <div style={{ fontWeight: 600, fontSize: "1.18rem", color: COLORS.primary }}>Your Custom Recipe</div>
            </div>
            <RecipeCard recipe={generatedRecipe} onViewDetails={() => setShowResult(9001)} />
            {showResult === 9001 &&
              <RecipeDetailsModal recipe={generatedRecipe} open={true} onClose={() => setShowResult(true)} />
            }
            <div style={{ marginTop: 20 }}>
              <button className="btn" style={{ background: COLORS.accent, color: "#fff" }} onClick={reset}>Build Another</button>
              <button className="btn" style={{ background: COLORS.secondary, color: "#fff", marginLeft: 12 }} onClick={() => { setTab('templates'); setShowResult(false); }}>View Templates</button>
            </div>
          </div>
        )
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

// Sections construction for tab navigation
const RECIPE_SECTIONS = [
  {
    tab: "5-Ingredient Recipes",
    key: "fiveIngredient",
    subtitle: "Simple meals, max flavor, minimal effort.",
    description: "Delicious dishes with just five ingredients.",
    recipes: FIVE_INGREDIENT_RECIPES
  },
  {
    tab: "Student Meals",
    key: "studentMeals",
    subtitle: "Budget-friendly & quick, made for students.",
    description: "Tasty meals on a student budget.",
    recipes: STUDENT_MEALS
  },
  {
    tab: "Vegan & Plant-Based Galaxy",
    key: "veganGalaxy",
    subtitle: "Explore protein-packed plant-based recipes.",
    description: "All plant-based, grouped by protein.",
    groupByProtein: true,
    proteinCategories: VEGAN_PROTEINS
  },
];

// PUBLIC_INTERFACE
// App: Bachelor Cooking main container with yellow theme, top-aligned columns, and updated title.
function App() {
  // Track current section/tab, and search bar state
  const [tab, setTab] = useState("fiveIngredient");
  const [search, setSearch] = useState('');

  // Top section columns structure
  const sectionColumns = [
    {
      key: "fiveIngredient",
      title: "5-Ingredient Recipes",
      subtitle: "Simple meals, max flavor, minimal effort.",
      description: "Delicious dishes with just five ingredients.",
      action: (
        <button className="btn" onClick={() => setTab("fiveIngredient")}>
          View Recipes
        </button>
      )
    },
    {
      key: "studentMeals",
      title: "Student Meals",
      subtitle: "Budget-friendly, quick, and made for students.",
      description: "Tasty meals on a student budget.",
      action: (
        <button className="btn" onClick={() => setTab("studentMeals")}>
          Explore
        </button>
      )
    },
    {
      key: "veganGalaxy",
      title: "Vegan & Plant-Based Galaxy",
      subtitle: "Protein-packed plant-based recipes.",
      description: "All plant-based, grouped by protein.",
      action: (
        <button className="btn" onClick={() => setTab("veganGalaxy")}>
          See Plant-Based
        </button>
      )
    },
    {
      key: "buildARecipe",
      title: "Build-a-Recipe",
      subtitle: "Customize your own meal.",
      description: "Create a recipe from your ingredients.",
      action: (
        <button className="btn" onClick={() => setTab("buildARecipe")}>
          Start Building
        </button>
      )
    }
  ];

  // Select current section for main area
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
      {/* Navbar (Bachelor Cooking brand) */}
      <nav
        className="navbar"
        style={{
          background: COLORS.primary,
          color: "#222",
          position: "fixed",
          zIndex: 100,
          width: "100%",
          top: 0,
          left: 0,
          border: "none",
          boxShadow: "0 2px 8px #0002"
        }}
      >
        <div
          className="container"
          style={{ display: "flex", alignItems: "center", justifyContent: "flex-start" }}
        >
          <span
            className="logo-symbol"
            style={{ color: COLORS.secondary, fontSize: 32, marginRight: 14 }}
          >🍽️</span>
          <span style={{ fontSize: 21, fontWeight: 700, letterSpacing: 1.12, color: "#111" }}>
            Bachelor Cooking
          </span>
        </div>
      </nav>

      {/* Main content */}
      <main style={{ paddingTop: 80, background: COLORS.background }}>
        <div className="container" style={{ minHeight: 440 }}>
          {/* Top Title and Section Columns */}
          <div style={{ paddingTop: "14px", textAlign: "center", marginBottom: 0 }}>
            <h1 className="title">
              Bachelor Cooking
            </h1>
            <div className="top-section-columns">
              {sectionColumns.map(col => (
                <div className="section-col" key={col.key}>
                  <div className="section-title">{col.title}</div>
                  <div className="subtitle">{col.subtitle}</div>
                  <div className="description">{col.description}</div>
                  <div className="col-action">{col.action}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Search bar */}
          <div style={{
            margin: "6px auto 22px auto",
            width: "100%",
            maxWidth: 420,
            position: "relative",
            display: "block"
          }}>
            <input
              type="text"
              placeholder="🔍 Search recipes, tags, or ingredients…"
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                width: "100%",
                borderRadius: 24,
                border: `1.6px solid ${COLORS.primary}44`,
                padding: "13px 24px",
                fontSize: 16,
                background: "#fff",
                boxShadow: "0 1px 8px #fc3e",
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
          color: "#333",
          padding: "16px 0",
          textAlign: "center",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          marginTop: 30,
          letterSpacing: 0.5,
          fontSize: 15
        }}
      >
        © {new Date().getFullYear()} Bachelor Cooking. Student meals, made bright!
      </footer>
    </div>
  );
}

export default App;
