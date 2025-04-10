import { create } from 'zustand';
import { eventBus, events } from '../../core/events';

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product, quantity = 1) => {
    const items = get().items;
    const existingItem = items.find(item => item.id === product.id);
    
    let newItems;
    
    if (existingItem) {
      newItems = items.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity } 
          : item
      );
    } else {
      newItems = [...items, { 
        ...product, 
        quantity,
        imageRequest: product.imageRequest
      }];
    }
    
    set({ items: newItems });
    eventBus.publish(events.CART_UPDATED, { items: newItems });
  },
  
  removeItem: (productId) => {
    const newItems = get().items.filter(item => item.id !== productId);
    set({ items: newItems });
    eventBus.publish(events.CART_UPDATED, { items: newItems });
  },
  
  updateQuantity: (productId, quantity) => {
    const newItems = get().items.map(item => 
      item.id === productId ? { ...item, quantity } : item
    );
    set({ items: newItems });
    eventBus.publish(events.CART_UPDATED, { items: newItems });
  },
  
  clearCart: () => {
    set({ items: [] });
    eventBus.publish(events.CART_UPDATED, { items: [] });
  },
  
  getTotal: () => {
    return get().items.reduce((total, item) => 
      total + (item.price * item.quantity), 0
    );
  }
}));