export type Language = 'fr' | 'en' | 'ar';

export type CategoryId = 'drinks' | 'smoothies' | 'brunch' | 'burgers' | 'crepes';

export interface MenuCategory {
  id: CategoryId;
  name: string;
  subcategories?: string[];
  description: string;
  icon: string;
}

export interface MenuItemOption {
  name: string;
  choices: string[];
  defaultChoice?: string;
  required?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  category: CategoryId;
  subcategory?: string;
  priceMAD: number;
  description?: string;
  details?: string;
  options?: MenuItemOption[];
  tags?: string[];
  isPopular?: boolean;
  image?: string;
}

export interface SelectedOption {
  optionName: string;
  choice: string;
}

export interface CartItem {
  id: string; // unique id per cart entry
  menuItem: MenuItem;
  quantity: number;
  selectedOptions: SelectedOption[];
  specialInstructions?: string;
  itemTotalMAD: number;
}

export type OrderType = 'dine-in' | 'takeaway' | 'delivery';

export interface OrderDetails {
  customerName: string;
  phone?: string;
  orderType: OrderType;
  tableNumber?: string;
  deliveryAddress?: string;
  notes?: string;
  items: CartItem[];
  totalMAD: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  tag?: string;
}
