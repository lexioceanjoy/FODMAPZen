import { FoodItem, FodmapStatus } from './types';

// Data transcribed from the provided PDF content
export const PDF_FOOD_DATABASE: FoodItem[] = [
  // Vegetables and Legumes - LOW
  { name: "Bamboo shoots", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Bean sprouts", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Broccoli heads", category: "Vegetables", status: FodmapStatus.LOW, portion: "3/4 cup" },
  { name: "Broccoli stalks", category: "Vegetables", status: FodmapStatus.LOW, portion: "1/3 cup" },
  { name: "Cabbage, common and red", category: "Vegetables", status: FodmapStatus.LOW, portion: "3/4 cup" },
  { name: "Carrots", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Celery", category: "Vegetables", status: FodmapStatus.LOW, portion: "less than 5cm stalk" },
  { name: "Chick peas", category: "Vegetables", status: FodmapStatus.LOW, portion: "1/4 cup max" },
  { name: "Corn", category: "Vegetables", status: FodmapStatus.LOW, portion: "1/2 cob max" },
  { name: "Courgette / Zucchini", category: "Vegetables", status: FodmapStatus.LOW, portion: "65g" },
  { name: "Cucumber", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Eggplant", category: "Vegetables", status: FodmapStatus.LOW, portion: "1 cup" },
  { name: "Green beans", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Green pepper", category: "Vegetables", status: FodmapStatus.LOW, portion: "1/2 cup" },
  { name: "Kale", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Lettuce (Butter, iceberg, rocket)", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Parsnip", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Potato", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Pumpkin", category: "Vegetables", status: FodmapStatus.LOW, portion: "63g" },
  { name: "Red peppers", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Scallions / spring onions (green part)", category: "Vegetables", status: FodmapStatus.LOW },
  { name: "Squash", category: "Vegetables", status: FodmapStatus.LOW, portion: "63g" },
  { name: "Sweet potato", category: "Vegetables", status: FodmapStatus.LOW, portion: "1/2 cup" },
  { name: "Tomatoes", category: "Vegetables", status: FodmapStatus.LOW, portion: "65g" },
  { name: "Turnip", category: "Vegetables", status: FodmapStatus.LOW, portion: "1/2 turnip" },
  
  // Vegetables and Legumes - HIGH
  { name: "Garlic", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Onions", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Asparagus", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Beans (black, broad, kidney, lima, soya)", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Cauliflower", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Cabbage, savoy", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Mange tout", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Mushrooms", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Peas", category: "Vegetables", status: FodmapStatus.HIGH },
  { name: "Scallions / spring onions (white part)", category: "Vegetables", status: FodmapStatus.HIGH },

  // Fruit - LOW
  { name: "Bananas, unripe", category: "Fruit", status: FodmapStatus.LOW, portion: "1 medium" },
  { name: "Blueberries", category: "Fruit", status: FodmapStatus.LOW, portion: "1/4 cup" },
  { name: "Cantaloupe", category: "Fruit", status: FodmapStatus.LOW, portion: "3/4 cup" },
  { name: "Cranberry", category: "Fruit", status: FodmapStatus.LOW },
  { name: "Clementine", category: "Fruit", status: FodmapStatus.LOW },
  { name: "Melons (Honeydew, Galia)", category: "Fruit", status: FodmapStatus.LOW, portion: "1/2 cup" },
  { name: "Kiwifruit", category: "Fruit", status: FodmapStatus.LOW, portion: "2 small" },
  { name: "Lemon", category: "Fruit", status: FodmapStatus.LOW },
  { name: "Orange", category: "Fruit", status: FodmapStatus.LOW },
  { name: "Pineapple", category: "Fruit", status: FodmapStatus.LOW },
  { name: "Raspberry", category: "Fruit", status: FodmapStatus.LOW, portion: "1/3 cup" },
  { name: "Rhubarb", category: "Fruit", status: FodmapStatus.LOW },
  { name: "Strawberry", category: "Fruit", status: FodmapStatus.LOW, portion: "5 medium" },

  // Fruit - HIGH
  { name: "Apples", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Apricot", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Avocado", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Bananas, ripe", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Blackberries", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Grapefruit", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Grapes", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Mango", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Peaches", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Pears", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Plums", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Raisins", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Sultanas", category: "Fruit", status: FodmapStatus.HIGH },
  { name: "Watermelon", category: "Fruit", status: FodmapStatus.HIGH },

  // Meat, Fish, Subs - LOW
  { name: "Beef", category: "Protein", status: FodmapStatus.LOW },
  { name: "Chicken", category: "Protein", status: FodmapStatus.LOW },
  { name: "Lamb", category: "Protein", status: FodmapStatus.LOW },
  { name: "Pork", category: "Protein", status: FodmapStatus.LOW },
  { name: "Quorn mince", category: "Protein", status: FodmapStatus.LOW },
  { name: "Cold cuts (Ham, turkey)", category: "Protein", status: FodmapStatus.LOW },
  { name: "Canned Tuna", category: "Protein", status: FodmapStatus.LOW },
  { name: "Fresh fish (Cod, Haddock, Salmon)", category: "Protein", status: FodmapStatus.LOW },
  
  // Meat, Fish, Subs - HIGH
  { name: "Sausages", category: "Protein", status: FodmapStatus.HIGH, notes: "Check ingredients" },
  { name: "Processed meat", category: "Protein", status: FodmapStatus.HIGH, notes: "Check ingredients" },

  // Grains - LOW
  { name: "Oats", category: "Grains", status: FodmapStatus.LOW },
  { name: "Quinoa", category: "Grains", status: FodmapStatus.LOW },
  { name: "Gluten free bread/pasta", category: "Grains", status: FodmapStatus.LOW },
  { name: "Rice (Basmati, brown, white)", category: "Grains", status: FodmapStatus.LOW },
  { name: "Tortilla chips", category: "Grains", status: FodmapStatus.LOW },
  { name: "Cornflour", category: "Grains", status: FodmapStatus.LOW },
  
  // Grains - HIGH
  { name: "Wheat foods (Bread, cereal, pasta)", category: "Grains", status: FodmapStatus.HIGH },
  { name: "Barley", category: "Grains", status: FodmapStatus.HIGH },
  { name: "Rye", category: "Grains", status: FodmapStatus.HIGH },
  { name: "Cous cous", category: "Grains", status: FodmapStatus.HIGH },
  { name: "Gnocchi", category: "Grains", status: FodmapStatus.HIGH },
  { name: "Granola", category: "Grains", status: FodmapStatus.HIGH },
  { name: "Muesli", category: "Grains", status: FodmapStatus.HIGH },

  // Milk - LOW
  { name: "Almond milk", category: "Dairy/Alt", status: FodmapStatus.LOW },
  { name: "Coconut milk", category: "Dairy/Alt", status: FodmapStatus.LOW, portion: "125ml" },
  { name: "Lactose free milk", category: "Dairy/Alt", status: FodmapStatus.LOW },
  { name: "Rice milk", category: "Dairy/Alt", status: FodmapStatus.LOW },
  { name: "Soya milk (soy protein)", category: "Dairy/Alt", status: FodmapStatus.LOW },

  // Milk - HIGH
  { name: "Cow milk", category: "Dairy/Alt", status: FodmapStatus.HIGH },
  { name: "Goat milk", category: "Dairy/Alt", status: FodmapStatus.HIGH },
  { name: "Soy milk (soy beans)", category: "Dairy/Alt", status: FodmapStatus.HIGH },
  
  // Sweeteners - LOW
  { name: "Aspartame", category: "Sweeteners", status: FodmapStatus.LOW },
  { name: "Acesulfame K", category: "Sweeteners", status: FodmapStatus.LOW },
  { name: "Glucose", category: "Sweeteners", status: FodmapStatus.LOW },
  { name: "Stevia", category: "Sweeteners", status: FodmapStatus.LOW },
  { name: "Sucralose", category: "Sweeteners", status: FodmapStatus.LOW },
  { name: "Sugar / sucrose", category: "Sweeteners", status: FodmapStatus.LOW },

  // Sweeteners - HIGH
  { name: "Honey", category: "Sweeteners", status: FodmapStatus.HIGH },
  { name: "High Fructose Corn Syrup (HFCS)", category: "Sweeteners", status: FodmapStatus.HIGH },
  { name: "Agave", category: "Sweeteners", status: FodmapStatus.HIGH },
  { name: "Sorbitol", category: "Sweeteners", status: FodmapStatus.HIGH },
  { name: "Xylitol", category: "Sweeteners", status: FodmapStatus.HIGH },
];

export const CATEGORIES = Array.from(new Set(PDF_FOOD_DATABASE.map(i => i.category))).sort();
