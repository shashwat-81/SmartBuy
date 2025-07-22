import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './ProductsNav.css';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [products] = useState([
    // Electronics (20 products)
    {
      id: 1,
      name: 'iPhone 15 Pro',
      price: 134900,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.8,
      reviews: 1234,
      originalPrice: 149900,
      discount: 10
    },
    {
      id: 2,
      name: 'MacBook Pro 14"',
      price: 199900,
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.9,
      reviews: 2341,
      originalPrice: 224900,
      discount: 11
    },
    {
      id: 3,
      name: 'Sony WH-1000XM4',
      price: 29990,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.7,
      reviews: 1876,
      originalPrice: 34990,
      discount: 14
    },
    {
      id: 4,
      name: 'Samsung Galaxy S24',
      price: 74999,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.4,
      reviews: 1092,
      originalPrice: 79999,
      discount: 6
    },
    {
      id: 5,
      name: 'iPad Air',
      price: 59900,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.6,
      reviews: 856,
      originalPrice: 64900,
      discount: 8
    },
    {
      id: 6,
      name: 'Canon EOS R5',
      price: 349900,
      image: 'https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.8,
      reviews: 567,
      originalPrice: 389900,
      discount: 10
    },
    {
      id: 7,
      name: 'Nintendo Switch',
      price: 32990,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.5,
      reviews: 1456,
      originalPrice: 36990,
      discount: 11
    },
    {
      id: 8,
      name: 'Dell XPS 13',
      price: 119990,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.4,
      reviews: 789,
      originalPrice: 129990,
      discount: 8
    },
    {
      id: 9,
      name: 'Apple Watch Series 9',
      price: 41900,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.6,
      reviews: 2134,
      originalPrice: 45900,
      discount: 9
    },
    {
      id: 10,
      name: 'AirPods Pro',
      price: 24900,
      image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.3,
      reviews: 3421,
      originalPrice: 26900,
      discount: 7
    },
    {
      id: 11,
      name: 'Samsung 55" 4K TV',
      price: 64990,
      image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.2,
      reviews: 876,
      originalPrice: 74990,
      discount: 13
    },
    {
      id: 12,
      name: 'PlayStation 5',
      price: 54990,
      image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.9,
      reviews: 4567,
      originalPrice: 59990,
      discount: 8
    },
    {
      id: 13,
      name: 'Bose SoundLink',
      price: 12990,
      image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.4,
      reviews: 1234,
      originalPrice: 14990,
      discount: 13
    },
    {
      id: 14,
      name: 'Microsoft Surface Pro',
      price: 89990,
      image: 'https://images.unsplash.com/photo-1588702547923-7ac9aec58fcf?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.3,
      reviews: 567,
      originalPrice: 99990,
      discount: 10
    },
    {
      id: 15,
      name: 'GoPro Hero 11',
      price: 44990,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.6,
      reviews: 890,
      originalPrice: 49990,
      discount: 10
    },
    {
      id: 16,
      name: 'HP Gaming Laptop',
      price: 84990,
      image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.1,
      reviews: 456,
      originalPrice: 94990,
      discount: 11
    },
    {
      id: 17,
      name: 'Kindle Paperwhite',
      price: 13999,
      image: 'https://images.unsplash.com/photo-1592496431122-2349e0fbc666?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.5,
      reviews: 2345,
      originalPrice: 15999,
      discount: 13
    },
    {
      id: 18,
      name: 'JBL Charge 5',
      price: 16999,
      image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.3,
      reviews: 1567,
      originalPrice: 19999,
      discount: 15
    },
    {
      id: 19,
      name: 'Logitech MX Master 3',
      price: 8995,
      image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.7,
      reviews: 3456,
      originalPrice: 9995,
      discount: 10
    },
    {
      id: 20,
      name: 'Ring Video Doorbell',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop&crop=center',
      category: 'Electronics',
      rating: 4.2,
      reviews: 876,
      originalPrice: 10999,
      discount: 18
    },

    // Fashion & Clothing (20 products)
    {
      id: 21,
      name: 'Nike Air Max 270',
      price: 12995,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.5,
      reviews: 856,
      originalPrice: 14995,
      discount: 13
    },
    {
      id: 22,
      name: 'Adidas Ultraboost 22',
      price: 17999,
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.6,
      reviews: 743,
      originalPrice: 19999,
      discount: 10
    },
    {
      id: 23,
      name: 'Levi\'s 511 Jeans',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.3,
      reviews: 1234,
      originalPrice: 4999,
      discount: 20
    },
    {
      id: 24,
      name: 'H&M Cotton T-Shirt',
      price: 999,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.1,
      reviews: 567,
      originalPrice: 1299,
      discount: 23
    },
    {
      id: 25,
      name: 'Zara Blazer',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.4,
      reviews: 432,
      originalPrice: 9999,
      discount: 20
    },
    {
      id: 26,
      name: 'Ray-Ban Aviators',
      price: 15999,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.7,
      reviews: 1890,
      originalPrice: 18999,
      discount: 16
    },
    {
      id: 27,
      name: 'Michael Kors Watch',
      price: 21999,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.5,
      reviews: 876,
      originalPrice: 24999,
      discount: 12
    },
    {
      id: 28,
      name: 'Puma Track Suit',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.2,
      reviews: 654,
      originalPrice: 7499,
      discount: 20
    },
    {
      id: 29,
      name: 'Coach Handbag',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.8,
      reviews: 234,
      originalPrice: 39999,
      discount: 13
    },
    {
      id: 30,
      name: 'Converse Chuck Taylor',
      price: 5999,
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.4,
      reviews: 2345,
      originalPrice: 6999,
      discount: 14
    },
    {
      id: 31,
      name: 'Polo Ralph Lauren Shirt',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.3,
      reviews: 567,
      originalPrice: 10999,
      discount: 18
    },
    {
      id: 32,
      name: 'Forever 21 Dress',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.0,
      reviews: 890,
      originalPrice: 3999,
      discount: 25
    },
    {
      id: 33,
      name: 'Tommy Hilfiger Jacket',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.5,
      reviews: 345,
      originalPrice: 15999,
      discount: 19
    },
    {
      id: 34,
      name: 'Calvin Klein Underwear',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.2,
      reviews: 1234,
      originalPrice: 2499,
      discount: 20
    },
    {
      id: 35,
      name: 'Vans Old Skool',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.4,
      reviews: 1567,
      originalPrice: 5999,
      discount: 17
    },
    {
      id: 36,
      name: 'Nike Sports Bra',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.3,
      reviews: 987,
      originalPrice: 3499,
      discount: 14
    },
    {
      id: 37,
      name: 'Fossil Leather Belt',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.1,
      reviews: 456,
      originalPrice: 4999,
      discount: 20
    },
    {
      id: 38,
      name: 'Uniqlo Hoodie',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.2,
      reviews: 789,
      originalPrice: 4999,
      discount: 20
    },
    {
      id: 39,
      name: 'Gucci Sunglasses',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.6,
      reviews: 123,
      originalPrice: 29999,
      discount: 17
    },
    {
      id: 40,
      name: 'Adidas Track Pants',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop&crop=center',
      category: 'Fashion & Clothing',
      rating: 4.3,
      reviews: 1111,
      originalPrice: 5999,
      discount: 17
    },

    // Home & Kitchen (15 products)
    {
      id: 41,
      name: 'KitchenAid Stand Mixer',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.8,
      reviews: 567,
      originalPrice: 39999,
      discount: 13
    },
    {
      id: 42,
      name: 'Instant Pot Duo',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.7,
      reviews: 2345,
      originalPrice: 14999,
      discount: 13
    },
    {
      id: 43,
      name: 'Dyson V11 Vacuum',
      price: 54999,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.6,
      reviews: 890,
      originalPrice: 64999,
      discount: 15
    },
    {
      id: 44,
      name: 'IKEA Bookshelf',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.3,
      reviews: 1234,
      originalPrice: 9999,
      discount: 20
    },
    {
      id: 45,
      name: 'Nespresso Coffee Machine',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.5,
      reviews: 654,
      originalPrice: 29999,
      discount: 17
    },
    {
      id: 46,
      name: 'Philips Air Fryer',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.4,
      reviews: 1567,
      originalPrice: 17999,
      discount: 17
    },
    {
      id: 47,
      name: 'Le Creuset Dutch Oven',
      price: 22999,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.9,
      reviews: 234,
      originalPrice: 26999,
      discount: 15
    },
    {
      id: 48,
      name: 'West Elm Sofa',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.2,
      reviews: 345,
      originalPrice: 104999,
      discount: 14
    },
    {
      id: 49,
      name: 'Cuisinart Food Processor',
      price: 18999,
      image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.6,
      reviews: 876,
      originalPrice: 21999,
      discount: 14
    },
    {
      id: 50,
      name: 'Ninja Blender',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.3,
      reviews: 1890,
      originalPrice: 10999,
      discount: 18
    },
    {
      id: 51,
      name: 'Pottery Barn Lamp',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.1,
      reviews: 456,
      originalPrice: 15999,
      discount: 19
    },
    {
      id: 52,
      name: 'Crate & Barrel Dinnerware',
      price: 9999,
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.4,
      reviews: 567,
      originalPrice: 11999,
      discount: 17
    },
    {
      id: 53,
      name: 'Roomba i7+',
      price: 79999,
      image: 'https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.5,
      reviews: 789,
      originalPrice: 89999,
      discount: 11
    },
    {
      id: 54,
      name: 'Breville Espresso Machine',
      price: 64999,
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.7,
      reviews: 234,
      originalPrice: 74999,
      discount: 13
    },
    {
      id: 55,
      name: 'Tempur-Pedic Pillow',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop&crop=center',
      category: 'Home & Kitchen',
      rating: 4.6,
      reviews: 1234,
      originalPrice: 17999,
      discount: 17
    },

    // Sports & Fitness (10 products)
    {
      id: 56,
      name: 'Peloton Bike',
      price: 189999,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.8,
      reviews: 1567,
      originalPrice: 219999,
      discount: 14
    },
    {
      id: 57,
      name: 'Bowflex Dumbbells',
      price: 39999,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.6,
      reviews: 890,
      originalPrice: 44999,
      discount: 11
    },
    {
      id: 58,
      name: 'Yoga Mat Premium',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.3,
      reviews: 2345,
      originalPrice: 3999,
      discount: 25
    },
    {
      id: 59,
      name: 'Fitbit Versa 4',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.4,
      reviews: 1234,
      originalPrice: 27999,
      discount: 11
    },
    {
      id: 60,
      name: 'NordicTrack Treadmill',
      price: 149999,
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.5,
      reviews: 567,
      originalPrice: 169999,
      discount: 12
    },
    {
      id: 61,
      name: 'Wilson Tennis Racket',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.2,
      reviews: 456,
      originalPrice: 14999,
      discount: 13
    },
    {
      id: 62,
      name: 'Nike Pro Shorts',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5e?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.1,
      reviews: 890,
      originalPrice: 3499,
      discount: 14
    },
    {
      id: 63,
      name: 'Garmin GPS Watch',
      price: 34999,
      image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.7,
      reviews: 234,
      originalPrice: 39999,
      discount: 13
    },
    {
      id: 64,
      name: 'Resistance Bands Set',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.0,
      reviews: 1567,
      originalPrice: 2499,
      discount: 20
    },
    {
      id: 65,
      name: 'Under Armour Gym Bag',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center',
      category: 'Sports & Fitness',
      rating: 4.3,
      reviews: 678,
      originalPrice: 5999,
      discount: 17
    },

    // Books & Education (10 products)
    {
      id: 66,
      name: 'Atomic Habits',
      price: 499,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.8,
      reviews: 5674,
      originalPrice: 599,
      discount: 17
    },
    {
      id: 67,
      name: 'The Psychology of Money',
      price: 399,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.7,
      reviews: 3456,
      originalPrice: 499,
      discount: 20
    },
    {
      id: 68,
      name: 'Clean Code',
      price: 799,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.9,
      reviews: 1234,
      originalPrice: 899,
      discount: 11
    },
    {
      id: 69,
      name: 'Sapiens',
      price: 599,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.6,
      reviews: 2890,
      originalPrice: 699,
      discount: 14
    },
    {
      id: 70,
      name: 'Think and Grow Rich',
      price: 299,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.5,
      reviews: 4567,
      originalPrice: 399,
      discount: 25
    },
    {
      id: 71,
      name: 'Python Crash Course',
      price: 899,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.7,
      reviews: 890,
      originalPrice: 999,
      discount: 10
    },
    {
      id: 72,
      name: 'The Lean Startup',
      price: 499,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.4,
      reviews: 1567,
      originalPrice: 599,
      discount: 17
    },
    {
      id: 73,
      name: 'Rich Dad Poor Dad',
      price: 349,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.3,
      reviews: 6789,
      originalPrice: 449,
      discount: 22
    },
    {
      id: 74,
      name: 'The 7 Habits',
      price: 399,
      image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.6,
      reviews: 3456,
      originalPrice: 499,
      discount: 20
    },
    {
      id: 75,
      name: 'JavaScript: The Good Parts',
      price: 799,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      category: 'Books & Education',
      rating: 4.5,
      reviews: 567,
      originalPrice: 899,
      discount: 11
    },

    // Beauty & Personal Care (8 products)
    {
      id: 76,
      name: 'Olay Regenerist',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.4,
      reviews: 2345,
      originalPrice: 3499,
      discount: 14
    },
    {
      id: 77,
      name: 'Urban Decay Palette',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.7,
      reviews: 890,
      originalPrice: 5999,
      discount: 17
    },
    {
      id: 78,
      name: 'Philips Shaver',
      price: 8999,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.3,
      reviews: 1234,
      originalPrice: 10999,
      discount: 18
    },
    {
      id: 79,
      name: 'L\'Oreal Hair Mask',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.2,
      reviews: 567,
      originalPrice: 1799,
      discount: 17
    },
    {
      id: 80,
      name: 'MAC Lipstick',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.6,
      reviews: 3456,
      originalPrice: 2299,
      discount: 13
    },
    {
      id: 81,
      name: 'Neutrogena Cleanser',
      price: 899,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.1,
      reviews: 1890,
      originalPrice: 1099,
      discount: 18
    },
    {
      id: 82,
      name: 'Dyson Hair Dryer',
      price: 39999,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.8,
      reviews: 234,
      originalPrice: 44999,
      discount: 11
    },
    {
      id: 83,
      name: 'The Ordinary Serum',
      price: 2499,
      image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=300&h=300&fit=crop&crop=center',
      category: 'Beauty & Personal Care',
      rating: 4.5,
      reviews: 1567,
      originalPrice: 2999,
      discount: 17
    },

    // Baby & Kids (5 products)
    {
      id: 84,
      name: 'Fisher-Price Play Mat',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&crop=center',
      category: 'Baby & Kids',
      rating: 4.4,
      reviews: 890,
      originalPrice: 5999,
      discount: 17
    },
    {
      id: 85,
      name: 'Pampers Diapers Pack',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&crop=center',
      category: 'Baby & Kids',
      rating: 4.6,
      reviews: 4567,
      originalPrice: 2299,
      discount: 13
    },
    {
      id: 86,
      name: 'LEGO Classic Set',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=300&fit=crop&crop=center',
      category: 'Baby & Kids',
      rating: 4.7,
      reviews: 1234,
      originalPrice: 4599,
      discount: 13
    },
    {
      id: 87,
      name: 'Baby Stroller',
      price: 24999,
      image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=300&fit=crop&crop=center',
      category: 'Baby & Kids',
      rating: 4.5,
      reviews: 345,
      originalPrice: 29999,
      discount: 17
    },
    {
      id: 88,
      name: 'Kids Tablet',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=300&fit=crop&crop=center',
      category: 'Baby & Kids',
      rating: 4.2,
      reviews: 567,
      originalPrice: 14999,
      discount: 13
    },

    // Pet Supplies (4 products)
    {
      id: 89,
      name: 'Dog Food Premium',
      price: 2999,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=center',
      category: 'Pet Supplies',
      rating: 4.3,
      reviews: 1234,
      originalPrice: 3499,
      discount: 14
    },
    {
      id: 90,
      name: 'Cat Litter Box',
      price: 3999,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=center',
      category: 'Pet Supplies',
      rating: 4.1,
      reviews: 456,
      originalPrice: 4999,
      discount: 20
    },
    {
      id: 91,
      name: 'Dog Leash Set',
      price: 1499,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=center',
      category: 'Pet Supplies',
      rating: 4.4,
      reviews: 789,
      originalPrice: 1799,
      discount: 17
    },
    {
      id: 92,
      name: 'Pet Bed Deluxe',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=300&fit=crop&crop=center',
      category: 'Pet Supplies',
      rating: 4.5,
      reviews: 234,
      originalPrice: 5999,
      discount: 17
    },

    // Office & Stationery (4 products)
    {
      id: 93,
      name: 'Herman Miller Chair',
      price: 89999,
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=300&fit=crop&crop=center',
      category: 'Office & Stationery',
      rating: 4.8,
      reviews: 123,
      originalPrice: 104999,
      discount: 14
    },
    {
      id: 94,
      name: 'Moleskine Notebook',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=300&fit=crop&crop=center',
      category: 'Office & Stationery',
      rating: 4.6,
      reviews: 567,
      originalPrice: 2299,
      discount: 13
    },
    {
      id: 95,
      name: 'IKEA Desk',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=300&fit=crop&crop=center',
      category: 'Office & Stationery',
      rating: 4.3,
      reviews: 890,
      originalPrice: 17999,
      discount: 17
    },
    {
      id: 96,
      name: 'Canon Printer',
      price: 12999,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=300&h=300&fit=crop&crop=center',
      category: 'Office & Stationery',
      rating: 4.2,
      reviews: 345,
      originalPrice: 14999,
      discount: 13
    },

    // Travel & Luggage (2 products)
    {
      id: 97,
      name: 'Samsonite Suitcase',
      price: 14999,
      image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=300&h=300&fit=crop&crop=center',
      category: 'Travel & Luggage',
      rating: 4.5,
      reviews: 789,
      originalPrice: 17999,
      discount: 17
    },
    {
      id: 98,
      name: 'Travel Backpack',
      price: 7999,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&crop=center',
      category: 'Travel & Luggage',
      rating: 4.3,
      reviews: 456,
      originalPrice: 9999,
      discount: 20
    },

    // Garden & Outdoor (2 products)
    {
      id: 99,
      name: 'Garden Tool Set',
      price: 4999,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop&crop=center',
      category: 'Garden & Outdoor',
      rating: 4.2,
      reviews: 234,
      originalPrice: 5999,
      discount: 17
    },
    {
      id: 100,
      name: 'Outdoor Patio Set',
      price: 49999,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=300&h=300&fit=crop&crop=center',
      category: 'Garden & Outdoor',
      rating: 4.4,
      reviews: 123,
      originalPrice: 59999,
      discount: 17
    }
  ]);

  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [compareList, setCompareList] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const categories = [
    'All', 
    'Electronics', 
    'Fashion & Clothing', 
    'Home & Kitchen', 
    'Sports & Fitness', 
    'Books & Education', 
    'Beauty & Personal Care',
    'Automotive',
    'Toys & Games',
    'Health & Wellness',
    'Pet Supplies',
    'Office & Stationery',
    'Food & Groceries',
    'Music & Instruments',
    'Travel & Luggage',
    'Garden & Outdoor',
    'Baby & Kids'
  ];

  // Fetch wishlist and cart data
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        // Fetch wishlist
        const wishlistResponse = await fetch('http://localhost:5000/api/shop/wishlist', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (wishlistResponse.ok) {
          const wishlistData = await wishlistResponse.json();
          setWishlistItems(wishlistData.data.items);
        }

        // Fetch cart
        const cartResponse = await fetch('http://localhost:5000/api/shop/cart', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        if (cartResponse.ok) {
          const cartData = await cartResponse.json();
          setCartItems(cartData.data.items);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    // Check for category parameter in URL
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [location.search]);

  useEffect(() => {
    let filtered = selectedCategory === 'All' 
      ? products 
      : products.filter(product => product.category === selectedCategory);

    // Apply search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply price range filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Sort products
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      if (sortBy === 'newest') return b.id - a.id;
      if (sortBy === 'popularity') return b.reviews - a.reviews;
      return a.name.localeCompare(b.name);
    });

    setFilteredProducts(filtered);
  }, [selectedCategory, sortBy, products, searchQuery, priceRange]);

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price);
  };

  const handleAddToCart = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/shop/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          productId: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          category: product.category,
          quantity: 1
        })
      });

      if (response.ok) {
        const result = await response.json();
        // Update cart state
        const updatedCart = [...cartItems];
        const existingItem = updatedCart.find(item => item.productId === product.id);
        
        if (existingItem) {
          existingItem.quantity += 1;
        } else {
          updatedCart.push({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category,
            quantity: 1
          });
        }
        setCartItems(updatedCart);
        alert('Product added to cart successfully!');
      } else {
        const error = await response.json();
        alert(error.message || 'Failed to add product to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  const handleToggleWishlist = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to manage wishlist');
      return;
    }

    const isInWishlist = wishlistItems.some(item => item.productId === product.id);

    try {
      if (isInWishlist) {
        // Remove from wishlist
        const response = await fetch(`http://localhost:5000/api/shop/wishlist/${product.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          setWishlistItems(wishlistItems.filter(item => item.productId !== product.id));
          alert('Product removed from wishlist!');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to remove from wishlist');
        }
      } else {
        // Add to wishlist
        const response = await fetch('http://localhost:5000/api/shop/wishlist', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          })
        });

        if (response.ok) {
          const newWishlistItem = {
            productId: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            category: product.category
          };
          setWishlistItems([...wishlistItems, newWishlistItem]);
          alert('Product added to wishlist!');
        } else {
          const error = await response.json();
          alert(error.message || 'Failed to add to wishlist');
        }
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
      alert('Failed to update wishlist. Please try again.');
    }
  };

  const isInWishlist = (productId) => {
    return wishlistItems.some(item => item.productId === productId);
  };

  const handleCompareToggle = (product) => {
    const isInCompare = compareList.some(item => item.id === product.id);
    if (isInCompare) {
      setCompareList(compareList.filter(item => item.id !== product.id));
    } else if (compareList.length < 4) {
      setCompareList([...compareList, product]);
    } else {
      alert('You can compare maximum 4 products');
    }
  };

  const handleQuickAdd = async (product) => {
    setLoading(true);
    await handleAddToCart(product);
    setLoading(false);
  };

  const clearAllFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setPriceRange([0, 500000]);
    setSortBy('name');
  };

  const getMaxPrice = () => {
    return Math.max(...products.map(p => p.price));
  };

  const isInCompare = (productId) => {
    return compareList.some(item => item.id === productId);
  };

  return (
    <div className="products-container">
      {/* Navigation Header */}
      <nav className="products-nav">
        <div className="nav-content">
          <div className="nav-left">
            <button className="back-btn" onClick={() => navigate('/dashboard')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 19l-7-7 7-7" />
              </svg>
              <span className="btn-text">Back to Dashboard</span>
            </button>
          </div>
          <div className="nav-logo">
            <h1>SmartBuy Products</h1>
          </div>
          <div className="nav-right">
            <button className="back-btn" title="Go to Cart" onClick={() => navigate('/cart')}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
              </svg>
              <span className="btn-text">Cart</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Filters Section */}
      <div className="filters-section">
        <div className="filters-content">
          {/* Search Bar */}
          <div className="search-container">
            <div className="search-input-wrapper">
              <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="clear-search"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18"/>
                    <line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              )}
            </div>
          </div>

          {/* Filter Toggle for Mobile */}
          <button 
            className="filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22,3 2,3 10,12.46 10,19 14,21 14,12.46"/>
            </svg>
            Filters
          </button>

          {/* View Mode Toggle */}
          <div className="view-mode-toggle">
            <button 
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="3" width="7" height="7"/>
                <rect x="14" y="3" width="7" height="7"/>
                <rect x="14" y="14" width="7" height="7"/>
                <rect x="3" y="14" width="7" height="7"/>
              </svg>
            </button>
            <button 
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="8" y1="6" x2="21" y2="6"/>
                <line x1="8" y1="12" x2="21" y2="12"/>
                <line x1="8" y1="18" x2="21" y2="18"/>
                <line x1="3" y1="6" x2="3.01" y2="6"/>
                <line x1="3" y1="12" x2="3.01" y2="12"/>
                <line x1="3" y1="18" x2="3.01" y2="18"/>
              </svg>
            </button>
          </div>

          {/* Results Count */}
          <div className="results-count">
            {filteredProducts.length} Product{filteredProducts.length !== 1 ? 's' : ''} Found
          </div>
        </div>

        {/* Advanced Filters */}
        <div className={`advanced-filters ${showFilters ? 'show' : ''}`}>
          <div className="filter-row">
            <div className="filter-group">
              <label>Category:</label>
              <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div className="filter-group">
              <label>Sort by:</label>
              <select 
                value={sortBy} 
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Name (A-Z)</option>
                <option value="price-low">Price (Low to High)</option>
                <option value="price-high">Price (High to Low)</option>
                <option value="rating">Rating</option>
                <option value="discount">Discount</option>
                <option value="newest">Newest</option>
                <option value="popularity">Popularity</option>
              </select>
            </div>

            <div className="filter-group price-filter">
              <label>Price Range: {formatPrice(priceRange[0])} - {formatPrice(priceRange[1])}</label>
              <div className="price-inputs">
                <input
                  type="number"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="price-input"
                  placeholder="Min"
                />
                <span>-</span>
                <input
                  type="number"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || getMaxPrice()])}
                  className="price-input"
                  placeholder="Max"
                />
              </div>
            </div>

            <button onClick={clearAllFilters} className="clear-filters-btn">
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="compare-bar">
            <div className="compare-content">
              <span>{compareList.length} items to compare</span>
              <div className="compare-actions">
                <button onClick={() => setCompareList([])} className="clear-compare">
                  Clear All
                </button>
                <button className="view-compare">
                  Compare ({compareList.length})
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Products Grid */}
      <div className={`products-grid ${viewMode === 'list' ? 'list-view' : 'grid-view'}`}>
        {filteredProducts.map(product => (
          <div key={product.id} className={`product-card ${viewMode}`}>
            <div className="product-image-container">
              <img src={product.image} alt={product.name} className="product-image" />
              {product.discount > 0 && (
                <div className="discount-badge">{product.discount}% OFF</div>
              )}
              
              {/* Quick Actions Overlay */}
              <div className="quick-actions-overlay">
                <button 
                  className="quick-action-btn"
                  onClick={() => setQuickViewProduct(product)}
                  title="Quick View"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </button>
                
                <button 
                  className={`quick-action-btn ${isInCompare(product.id) ? 'active' : ''}`}
                  onClick={() => handleCompareToggle(product)}
                  title="Add to Compare"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="17 1 21 5 17 9"/>
                    <path d="M3 11v-1a4 4 0 0 1 4-4h14"/>
                    <polyline points="7 23 3 19 7 15"/>
                    <path d="M21 13v1a4 4 0 0 1-4 4H3"/>
                  </svg>
                </button>

                <button 
                  className="quick-action-btn quick-add"
                  onClick={() => handleQuickAdd(product)}
                  title="Quick Add to Cart"
                  disabled={loading}
                >
                  {loading ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loading-spinner">
                      <path d="M21 12a9 9 0 11-6.219-8.56"/>
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 5v14"/>
                      <path d="M5 12h14"/>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            
            <div className="product-info">
              <div className="product-header">
                <h3 className="product-name">{product.name}</h3>
                <button 
                  className={`btn-wishlist-mini ${isInWishlist(product.id) ? 'in-wishlist' : ''}`}
                  onClick={() => handleToggleWishlist(product)}
                  title={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
                >
                  <svg width="16" height="16" fill={isInWishlist(product.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>
              
              <div className="product-category">{product.category}</div>
              
              <div className="product-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className={`star ${i < Math.floor(product.rating) ? 'filled' : ''}`}>
                      ★
                    </span>
                  ))}
                  <span className="rating-text">({product.rating}) · {product.reviews} reviews</span>
                </div>
              </div>
              
              <div className="product-pricing">
                <div className="current-price">{formatPrice(product.price)}</div>
                {product.originalPrice > product.price && (
                  <>
                    <div className="original-price">{formatPrice(product.originalPrice)}</div>
                    <div className="savings">Save {formatPrice(product.originalPrice - product.price)}</div>
                  </>
                )}
              </div>
              
              <div className="product-actions">
                <button 
                  className="btn-cart"
                  onClick={() => handleAddToCart(product)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="loading-spinner">
                        <path d="M21 12a9 9 0 11-6.219-8.56"/>
                      </svg>
                      Adding...
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="9" cy="21" r="1"/>
                        <circle cx="20" cy="21" r="1"/>
                        <path d="m1 1 4 4 16 9-9.5-9.5"/>
                        <path d="M12 2v8"/>
                        <path d="M8 8l12 5-8 7"/>
                      </svg>
                      Add to Cart
                    </>
                  )}
                </button>
                
                <button 
                  className="btn-secondary"
                  onClick={() => setQuickViewProduct(product)}
                >
                  Quick View
                </button>
              </div>
              
              {/* Stock Status */}
              <div className="stock-status">
                <span className="stock-indicator available"></span>
                In Stock - Fast Shipping
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="no-products">
          <div className="no-products-content">
            <svg width="80" height="80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3>No products found</h3>
            <p>Try adjusting your filters or search criteria</p>
            <button onClick={clearAllFilters} className="retry-btn">
              Clear Filters & Try Again
            </button>
          </div>
        </div>
      )}

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div className="modal-overlay" onClick={() => setQuickViewProduct(null)}>
          <div className="quick-view-modal" onClick={(e) => e.stopPropagation()}>
            <button 
              className="modal-close"
              onClick={() => setQuickViewProduct(null)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div className="modal-content">
              <div className="modal-image">
                <img src={quickViewProduct.image} alt={quickViewProduct.name} />
                {quickViewProduct.discount > 0 && (
                  <div className="discount-badge">{quickViewProduct.discount}% OFF</div>
                )}
              </div>
              
              <div className="modal-details">
                <div className="product-category">{quickViewProduct.category}</div>
                <h2 className="product-name">{quickViewProduct.name}</h2>
                
                <div className="product-rating">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={`star ${i < Math.floor(quickViewProduct.rating) ? 'filled' : ''}`}>
                        ★
                      </span>
                    ))}
                    <span className="rating-text">({quickViewProduct.rating}) · {quickViewProduct.reviews} reviews</span>
                  </div>
                </div>
                
                <div className="product-pricing">
                  <div className="current-price">{formatPrice(quickViewProduct.price)}</div>
                  {quickViewProduct.originalPrice > quickViewProduct.price && (
                    <>
                      <div className="original-price">{formatPrice(quickViewProduct.originalPrice)}</div>
                      <div className="savings">Save {formatPrice(quickViewProduct.originalPrice - quickViewProduct.price)}</div>
                    </>
                  )}
                </div>
                
                <div className="product-features">
                  <div className="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                      <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
                      <line x1="12" y1="22.08" x2="12" y2="12"/>
                    </svg>
                    Free Shipping
                  </div>
                  <div className="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"/>
                      <polyline points="12,6 12,12 16,14"/>
                    </svg>
                    Fast Delivery
                  </div>
                  <div className="feature">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    </svg>
                    1 Year Warranty
                  </div>
                </div>
                
                <div className="modal-actions">
                  <button 
                    className="btn-cart-modal"
                    onClick={() => {
                      handleAddToCart(quickViewProduct);
                      setQuickViewProduct(null);
                    }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="9" cy="21" r="1"/>
                      <circle cx="20" cy="21" r="1"/>
                      <path d="m1 1 4 4 16 9-9.5-9.5"/>
                    </svg>
                    Add to Cart
                  </button>
                  
                  <button 
                    className={`btn-wishlist-modal ${isInWishlist(quickViewProduct.id) ? 'in-wishlist' : ''}`}
                    onClick={() => handleToggleWishlist(quickViewProduct)}
                  >
                    <svg width="16" height="16" fill={isInWishlist(quickViewProduct.id) ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {isInWishlist(quickViewProduct.id) ? 'In Wishlist' : 'Add to Wishlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
