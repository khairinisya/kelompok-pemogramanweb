const STORE_DATA = {
  users: [
    {
      id: 1,
      name: 'Admin',
      email: 'admin@dreamfashion.com',
      password: 'password123', // In real app, never store plain passwords
      role: 'admin'
    },
    {
      id: 2,
      name: 'Customer',
      email: 'customer@example.com',
      password: 'password123',
      role: 'customer'
    }
  ],
  
  categories: [
    {
      id: 1,
      name: 'Fashion Wanita',
      slug: 'fashion-wanita',
      image_path: 'https://images.unsplash.com/photo-1483985988355-763728e1935b',
      type: 'women',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 2,
      name: 'Dress',
      slug: 'dress',
      image_path: 'https://images.unsplash.com/photo-1533834381209-cacc4d419e8f?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      type: 'women',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 3,
      name: 'Accessories',
      slug: 'accessories',
      image_path: 'https://images.unsplash.com/photo-1576053139778-7e32f2ae3cfd',
      type: 'women',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 4,
      name: 'Casual Men',
      slug: 'casual-men',
      image_path: 'https://images.unsplash.com/photo-1516826957135-700dedea698c',
      type: 'men',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 5,
      name: 'Formal Men',
      slug: 'formal-men',
      image_path: 'https://images.unsplash.com/photo-1593030761757-71fae45fa0e7',
      type: 'men',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 6,
      name: 'Street Style',
      slug: 'street-style',
      image_path: 'https://images.unsplash.com/photo-1523398002811-999ca8dec234',
      type: 'men',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 7,
      name: 'Modern Classic',
      slug: 'modern-classic',
      image_path: 'https://images.unsplash.com/photo-1617137968427-85924c800a22',
      type: 'men',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    }
  ],

  products: [
    {
      id: 1,
      category_id: 3,
      name: 'JAM TANGAN WANITA',
      slug: 'jam-tangan-wanita',
      description: 'JAM TANGAN SIMPLE CLASSIC WATCH',
      price: 85000.00,
      stock: 50,
      image_path: 'products/jam-tangan.jpg',
      is_trending: 1,
      is_discount: 1,
      discount_percentage: 85.00,
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 2,
      category_id: 1,
      name: 'SNEAKERS WANITA',
      slug: 'sneakers-wanita',
      description: 'SNEAKERS CASUAL SPORTY',
      price: 165000.00,
      stock: 30,
      image_path: 'products/sneakers.jpg',
      is_trending: 1,
      is_discount: 0,
      discount_percentage: null,
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 3,
      category_id: 2,
      name: 'DRESS WANITA',
      slug: 'dress-wanita',
      description: 'DRESS FASHION WANITA\nBahan: Premium quality\nWarna: Cream\nStyle: Casual elegant\nLengan panjang dengan detail kancing\nPinggang elastis\nRok model mermaid',
      price: 180000.00,
      stock: 25,
      image_path: 'products/dress.jpg',
      is_trending: 1,
      is_discount: 0,
      discount_percentage: null,
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 4,
      category_id: 2,
      name: 'GAUN WANITA',
      slug: 'gaun-wanita',
      description: 'GAUN PESTA ELEGAN',
      price: 245000.00,
      stock: 20,
      image_path: 'products/gaun.jpg',
      is_trending: 0,
      is_discount: 1,
      discount_percentage: 50.00,
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    },
    {
      id: 5,
      category_id: 1,
      name: 'SEPATU BOOTS',
      slug: 'sepatu-boots',
      description: 'SEPATU BOOTS WANITA',
      price: 425000.00,
      stock: 15,
      image_path: 'products/boots.jpg',
      is_trending: 0,
      is_discount: 0,
      discount_percentage: null,
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    }
  ],

  orders: [
    {
      id: 1,
      user_id: 2,
      total_amount: 180000.00,
      status: 'completed',
      shipping_address: 'Jl. Example No. 123, Jakarta',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    }
  ],

  order_items: [
    {
      id: 1,
      order_id: 1,
      product_id: 3,
      quantity: 1,
      price: 180000.00,
      size: 'M',
      created_at: '2024-12-15 05:44:25',
      updated_at: '2024-12-15 05:44:25'
    }
  ],

  // Helper function to get category by ID
  getCategoryById(id) {
    return this.categories.find(category => category.id === id);
  },

  // Helper function to get product by ID
  getProductById(id) {
    return this.products.find(product => product.id === id);
  },

  // Helper function to get product's category
  getProductCategory(product) {
    return this.getCategoryById(product.category_id);
  },

  // Helper function to calculate final price after discount
  calculateFinalPrice(product) {
    if (product.is_discount && product.discount_percentage) {
      return product.price * (1 - product.discount_percentage / 100);
    }
    return product.price;
  }
};

