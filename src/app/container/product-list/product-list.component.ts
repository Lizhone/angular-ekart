import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../Models/Product';
import { CartService } from '../../services/cart.service';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   isSalePage: boolean = false;
  constructor(
  private productService: ProductService,
  private cartService: CartService,
  private router: Router
) {}


ngOnInit(): void {

  // Detect whether the current page is Sale
  this.isSalePage = this.router.url.split('?')[0] === '/sale';

  // Listen for navigation between Home and Sale
  this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe(() => {
      this.isSalePage = this.router.url.split('?')[0] === '/sale';
      this.applyFilters();
    });

  // Load products from SQL Server
  this.productService.getProducts().subscribe({
    next: (data: any[]) => {

      if (data.length === 0) {
        console.warn(
          'SQL Server returned no products. Keeping sample products.'
        );
        return;
      }

      const databaseProducts: Product[] = data.map(
        (item): Product => ({
          id: item.ProductId,
          name: item.ProductName,
          description: item.Description ?? '',
          brand: item.Brand ?? '',
          gender: item.Gender ?? 'UNISEX',
          category: item.Category ?? '',
          size: item.Size ? JSON.parse(item.Size) : [],
          color: item.Color ? JSON.parse(item.Color) : [],
          price: Number(item.Price),
          discountPrice:
            item.DiscountPrice != null
              ? Number(item.DiscountPrice)
              : undefined,
          is_in_inventory: Number(item.Stock) > 0,
          items_left: Number(item.Stock ?? 0),
          imageURL: item.ImageURL ?? '',
          slug: item.Slug ?? ''
        })
      );

      this.products = databaseProducts;

      this.totalProductCount = this.products.length;

      this.totalProductInStock = this.products.filter(
        product => product.is_in_inventory
      ).length;

      this.totalProductOutOfStock =
        this.totalProductCount - this.totalProductInStock;

      // Apply the correct filters for the current page
      this.applyFilters();

      console.log(
        'Products loaded from SQL Server:',
        this.products.length
      );
    },

    error: (error: any) => {
      console.error(
        'Failed to load SQL Server products:',
        error
      );

      console.warn('Keeping existing sample products.');
    }
  });
}
handleAddToCart(item: {
  product: Product;
  size: number;
  color: string;
  quantity: number;
}): void {
  this.cartService.addToCart(item);
  console.log('Product added to shared cart:', item);
}

  products: Product[] = [

    // 1
    {
      id: 1,
      name: 'Nike React Infinity Run Flyknit',
      description: 'Comfortable running shoes designed for everyday running.',
      brand: 'Nike',
      gender: 'MEN',
      category: 'RUNNING',
      size: [6, 7, 8, 9, 10],
      color: ['Grey', 'Green', 'Black'],
      price: 160,
      discountPrice: 140,
      is_in_inventory: true,
      items_left: 5,
      imageURL: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80',
      slug: 'nike-react-infinity-run-flyknit'
    },

    // 2
    {
      id: 2,
      name: 'Nike React Miler',
      description: 'Lightweight running shoes with a comfortable fit.',
      brand: 'Nike',
      gender: 'MEN',
      category: 'RUNNING',
      size: [7, 8, 9, 10],
      color: ['Black', 'Red'],
      price: 130,
      is_in_inventory: false,
      items_left: 0,
      imageURL: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=500&q=80',
      slug: 'nike-react-miler'
    },

    // 3
    {
      id: 3,
      name: 'Nike Air Zoom Pegasus 37',
      description: 'Responsive running shoes for everyday training.',
      brand: 'Nike',
      gender: 'WOMEN',
      category: 'RUNNING',
      size: [6, 7, 8, 9],
      color: ['White', 'Blue', 'Red'],
      price: 120,
      discountPrice: 105,
      is_in_inventory: true,
      items_left: 8,
      imageURL: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=500&q=80',
      slug: 'nike-air-zoom-pegasus-37'
    },

    // 4
    {
      id: 4,
      name: 'Adidas Ultraboost',
      description: 'Premium running shoes with responsive cushioning.',
      brand: 'Adidas',
      gender: 'MEN',
      category: 'RUNNING',
      size: [7, 8, 9, 10, 11],
      color: ['White', 'Black'],
      price: 180,
      discountPrice: 150,
      is_in_inventory: true,
      items_left: 4,
      imageURL: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=500&q=80',
      slug: 'adidas-ultraboost'
    },

    // 5
    {
      id: 5,
      name: 'Puma RS-X',
      description: 'Modern casual sneakers with a bold design.',
      brand: 'Puma',
      gender: 'MEN',
      category: 'CASUAL',
      size: [6, 7, 8, 9],
      color: ['White', 'Blue', 'Black'],
      price: 110,
      is_in_inventory: false,
      items_left: 0,
      imageURL: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=500&q=80',
      slug: 'puma-rs-x'
    },

    // 6
    {
      id: 6,
      name: 'New Balance Fresh Foam',
      description: 'Comfortable shoes for running and daily activities.',
      brand: 'New Balance',
      gender: 'WOMEN',
      category: 'SPORTS',
      size: [6, 7, 8, 9],
      color: ['Pink', 'White'],
      price: 125,
      discountPrice: 99,
      is_in_inventory: true,
      items_left: 6,
      imageURL: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80',
      slug: 'new-balance-fresh-foam'
    },

    // 7
    {
      id: 7,
      name: 'Adidas Grand Court',
      description: 'Classic casual sneakers suitable for everyday wear.',
      brand: 'Adidas',
      gender: 'WOMEN',
      category: 'CASUAL',
      size: [5, 6, 7, 8],
      color: ['White', 'Pink', 'Green'],
      price: 95,
      discountPrice: 80,
      is_in_inventory: true,
      items_left: 7,
      imageURL: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&w=500&q=80',
      slug: 'adidas-grand-court'
    },

    // 8
    {
      id: 8,
      name: 'Nike Air Force 1',
      description: 'Classic sneakers with a clean everyday design.',
      brand: 'Nike',
      gender: 'UNISEX',
      category: 'SNEAKERS',
      size: [6, 7, 8, 9, 10, 11],
      color: ['White', 'Black'],
      price: 135,
      discountPrice: 120,
      is_in_inventory: true,
      items_left: 9,
      imageURL: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?auto=format&fit=crop&w=500&q=80',
      slug: 'nike-air-force-1'
    },

    // 9
    {
      id: 9,
      name: 'Puma Training Pro',
      description: 'Training shoes designed for gym and workout sessions.',
      brand: 'Puma',
      gender: 'MEN',
      category: 'TRAINING',
      size: [7, 8, 9, 10],
      color: ['Black', 'Grey', 'Orange'],
      price: 115,
      is_in_inventory: false,
      items_left: 0,
      imageURL: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=500&q=80',
      slug: 'puma-training-pro'
    },

    // 10
    {
      id: 10,
      name: 'Reebok Classic Leather',
      description: 'Timeless leather sneakers for everyday casual outfits.',
      brand: 'Reebok',
      gender: 'WOMEN',
      category: 'CASUAL',
      size: [5, 6, 7, 8, 9],
      color: ['White', 'Cream'],
      price: 100,
      discountPrice: 85,
      is_in_inventory: true,
      items_left: 5,
      imageURL: 'https://images.unsplash.com/photo-1495555961986-6d4c1ecb7be3?auto=format&fit=crop&w=500&q=80',
      slug: 'reebok-classic-leather'
    },

    // 11
    {
      id: 11,
      name: 'Adidas Football Speed',
      description: 'Lightweight football shoes designed for speed and control.',
      brand: 'Adidas',
      gender: 'MEN',
      category: 'FOOTBALL',
      size: [7, 8, 9, 10, 11],
      color: ['Black', 'White', 'Red'],
      price: 145,
      discountPrice: 125,
      is_in_inventory: true,
      items_left: 3,
      imageURL: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=500&q=80',
      slug: 'adidas-football-speed'
    },

    // 12
 {
  id: 12,
  name: 'New Balance Womens Running',
  description: 'Lightweight running shoes designed for comfortable daily runs.',
  brand: 'New Balance',
  gender: 'WOMEN',
  category: 'RUNNING',
  size: [5, 6, 7, 8, 9],
  color: ['Pink', 'White', 'Grey'],
  price: 130,
  discountPrice: 110,
  is_in_inventory: false,
  items_left: 0,
  imageURL: 'https://images.unsplash.com/photo-1465453869711-7e174808ace9?auto=format&fit=crop&fm=jpg&q=80&w=1000',
  slug: 'new-balance-womens-running'
},
    // 13
    {
      id: 13,
      name: 'Converse Chuck Taylor',
      description: 'Iconic casual shoes with a classic canvas design.',
      brand: 'Converse',
      gender: 'UNISEX',
      category: 'SNEAKERS',
      size: [6, 7, 8, 9, 10],
      color: ['Black', 'White', 'Red'],
      price: 90,
      is_in_inventory: true,
      items_left: 10,
      imageURL: 'https://images.unsplash.com/photo-1494496195158-c3becb4f2475?auto=format&fit=crop&w=500&q=80',
      slug: 'converse-chuck-taylor'
    },

    // 14
    {
      id: 14,
      name: 'Nike Court Vision Low',
      description: 'Classic low-top sneakers inspired by basketball style.',
      brand: 'Nike',
      gender: 'WOMEN',
      category: 'SPORTS',
      size: [5, 6, 7, 8, 9],
      color: ['White', 'Green'],
      price: 105,
      discountPrice: 90,
      is_in_inventory: true,
      items_left: 6,
      imageURL: 'https://images.unsplash.com/photo-1543508282-6319a3e2621f?auto=format&fit=crop&w=500&q=80',
      slug: 'nike-court-vision-low'
    },

    // 15
    {
      id: 15,
      name: 'Puma Suede Classic',
      description: 'Classic suede sneakers with a stylish everyday look.',
      brand: 'Puma',
      gender: 'UNISEX',
      category: 'SNEAKERS',
      size: [6, 7, 8, 9, 10],
      color: ['Blue', 'White', 'Black'],
      price: 100,
      discountPrice: 85,
      is_in_inventory: false,
      items_left: 0,
      imageURL: 'https://images.unsplash.com/photo-1605408499391-6368c628ef42?auto=format&fit=crop&w=500&q=80',
      slug: 'puma-suede-classic'
    }

  ];
  


  // Total number of products
  totalProductCount = this.products.length;


  // Number of products in stock
  totalProductInStock = this.products.filter(
    p => p.is_in_inventory === true
  ).length;


  // Number of products out of stock
  totalProductOutOfStock = this.products.filter(
    p => p.is_in_inventory === false
  ).length;


  // Products currently displayed
  filteredProducts: Product[] = this.products;


  // Current selected stock filter
  selectedFilter: string = 'all';

// Search text
searchText: string = '';

selectedProduct: Product | null = null;

onProductSelected(product: Product) {
  this.selectedProduct = product;
}

closeProductDetails() {
  this.selectedProduct = null;
}

  // Filter products by stock
  onFilterChanged(value: string) {

    this.selectedFilter = value;

    this.applyFilters();

  }


  // Search products
  onSearchChanged(value: string) {

    this.searchText = value;

    this.applyFilters();

  }


  
applyFilters() {
  const search = this.searchText.toLowerCase().trim();

  this.filteredProducts = this.products.filter(product => {

    // SALE FILTER
    const hasDiscount =
      product.discountPrice != null &&
      product.discountPrice > 0 &&
      product.discountPrice < product.price;

    if (this.isSalePage && !hasDiscount) {
      return false;
    }

    // YOUR EXISTING STOCK FILTER
    let matchesStock = true;

    if (this.selectedFilter === 'true') {
      matchesStock = product.is_in_inventory === true;
    } else if (this.selectedFilter === 'false') {
      matchesStock = product.is_in_inventory === false;
    }

    // KEEP THE REST OF YOUR EXISTING SEARCH CODE BELOW


    // --------------------------------
    // SEARCH FILTER
    // --------------------------------

    if (search === '') {

      return matchesStock;

    }


    // All information that can be searched
    const productDetails = `
      ${product.name}
      ${product.description}
      ${product.brand}
      ${product.category}
      ${product.color.join(' ')}
    `.toLowerCase();


    // Separate search words
    const searchWords = search.split(/\s+/);


    // Every search word must match
    const matchesSearch = searchWords.every(word => {

      // --------------------------------
      // Gender search
      // --------------------------------

      if (word === 'men' || word === 'man') {

        return product.gender.toLowerCase() === 'men';

      }

      if (word === 'women' || word === 'woman') {

        return product.gender.toLowerCase() === 'women';

      }

      if (word === 'unisex') {

        return product.gender.toLowerCase() === 'unisex';

      }


      // --------------------------------
      // Shoe search
      // --------------------------------

      if (
        word === 'shoe' ||
        word === 'shoes'
      ) {

        return true;

      }


      // --------------------------------
      // Other searches
      // --------------------------------

      return productDetails.includes(word);

    });


    return matchesStock && matchesSearch;

  });

}
}