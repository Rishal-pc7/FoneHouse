export interface ShopProduct {
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    imageUrl: string;
    isNew?: boolean;
    specifications?: Record<string, string> | string[];
}

export const mockShopProducts: ShopProduct[] = [
    {
        id: '1',
        name: 'iPhone 15 Pro Max',
        description: 'Titanium design, A17 Pro chip, 48MP Main camera.',
        price: 4999.00,
        category: 'Mobile Phones',
        imageUrl: 'https://images.unsplash.com/photo-1706020586940-0235b866c116?q=80&w=800&auto=format&fit=crop', // Placeholder Unsplash image
        isNew: true,
        specifications: {
            "Processor": "A17 Pro chip",
            "Display": "6.7-inch Super Retina XDR",
            "Camera": "48MP Main | Ultra Wide | Telephoto",
            "Battery": "Up to 29 hours video playback",
            "Material": "Titanium design"
        }
    },
    {
        id: '2',
        name: 'Samsung Galaxy S24 Ultra',
        description: 'Galaxy AI is here. Epic titanium build.',
        price: 4599.00,
        category: 'Mobile Phones',
        imageUrl: 'https://images.unsplash.com/photo-1706020586940-0235b866c116?q=80&w=800&auto=format&fit=crop',
        isNew: true,
        specifications: {
            "Processor": "Snapdragon 8 Gen 3 for Galaxy",
            "Display": "6.8-inch QHD+ Dynamic AMOLED 2X",
            "Camera": "200MP Wide-angle Camera",
            "S Pen": "Built-in S Pen",
            "Battery": "5000mAh"
        }
    },
    {
        id: '3',
        name: 'AirPods Pro (2nd Gen)',
        description: 'Rich audio. Next-level Active Noise Cancellation.',
        price: 949.00,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1603351154351-5cf23c6def4d?q=80&w=800&auto=format&fit=crop',
        specifications: [
            "Active Noise Cancellation",
            "Adaptive Transparency",
            "Personalized Spatial Audio",
            "MagSafe Charging Case (USB-C)",
            "Up to 6 hours of listening time"
        ]
    },
    {
        id: '4',
        name: 'MacBook Air M2',
        description: 'Strikingly thin and fast with 18 hours battery life.',
        price: 4999.00,
        category: 'Laptops',
        imageUrl: 'https://images.unsplash.com/photo-1663363321523-952b1130d200?q=80&w=800&auto=format&fit=crop',
        specifications: {
            "Chip": "Apple M2 chip",
            "Memory": "8GB Unified Memory",
            "Storage": "256GB SSD",
            "Display": "13.6-inch Liquid Retina display",
            "Weight": "1.24 kg"
        }
    },
    {
        id: '5',
        name: 'iPad Pro 12.9"',
        description: 'Supercharged by M2. The ultimate iPad experience.',
        price: 4399.00,
        category: 'Tablets',
        imageUrl: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800&auto=format&fit=crop',
        specifications: {
            "Chip": "M2 chip",
            "Display": "12.9-inch Liquid Retina XDR",
            "Connectivity": "Wi-Fi 6E + 5G Cellular",
            "Camera": "12MP Wide and 10MP Ultra Wide",
            "Connector": "USB-C with Thunderbolt / USB 4"
        }
    },
    {
        id: '6',
        name: 'USB-C Fast Charger',
        description: 'High-speed charging for all your devices.',
        price: 129.00,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1629813291243-7a92233f2024?q=80&w=800&auto=format&fit=crop',
        specifications: [
            "20W Power Delivery",
            "Compact and Portable",
            "Universal Compatibility",
            "Safety Protection Features",
            "Fast Charging Support"
        ]
    },
    {
        id: '7',
        name: 'Apple Watch Ultra 2',
        description: 'The most rugged and capable Apple Watch yet.',
        price: 3199.00,
        category: 'Wearables',
        imageUrl: 'https://images.unsplash.com/photo-1696009893540-0d67f10b7410?q=80&w=800&auto=format&fit=crop',
        isNew: true,
        specifications: {
            "Case": "49mm Titanium Case",
            "Display": "Always-On Retina display",
            "Water Resistance": "100m water resistant",
            "Battery": "Up to 36 hours",
            "Features": "Precision Dual-Frequency GPS"
        }
    },
    {
        id: '8',
        name: 'Sony WH-1000XM5',
        description: 'Industry-leading noise canceling headphones.',
        price: 1299.00,
        category: 'Accessories',
        imageUrl: 'https://images.unsplash.com/photo-1662492582735-85970c326e5a?q=80&w=800&auto=format&fit=crop',
        specifications: [
            "Industry-leading Noise Cancellation",
            "30-hour battery life",
            "Quick Charging (3 min for 3 hours)",
            "Crystal-clear hands-free calling",
            "Multipoint Connection"
        ]
    }
];
