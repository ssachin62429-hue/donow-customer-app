-- DoNow Production Database Schema for Neon PostgreSQL
-- Run this in your Neon Console -> SQL Editor

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Customers)
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100),
    email VARCHAR(150),
    city VARCHAR(50) DEFAULT 'Lucknow',
    preferred_language VARCHAR(10) DEFAULT 'English',
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Partners Table (Verified Assistants)
CREATE TABLE IF NOT EXISTS partners (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    phone VARCHAR(15) UNIQUE NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url TEXT,
    aadhaar_number_masked VARCHAR(20),
    is_aadhaar_verified BOOLEAN DEFAULT TRUE,
    is_police_verified BOOLEAN DEFAULT TRUE,
    rating NUMERIC(3,2) DEFAULT 4.80,
    total_orders INTEGER DEFAULT 0,
    duty_status VARCHAR(20) DEFAULT 'OFFLINE', -- 'ONLINE', 'BUSY', 'OFFLINE'
    current_lat NUMERIC(10, 7),
    current_lng NUMERIC(10, 7),
    last_active TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Services Catalog (Micro-assistance & Queue Rates)
CREATE TABLE IF NOT EXISTS services (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL,
    rate_per_min NUMERIC(6, 2) NOT NULL DEFAULT 2.00,
    min_floor_minutes INTEGER NOT NULL DEFAULT 30, -- Mandatory 30-min minimum floor
    description TEXT,
    icon_name VARCHAR(50) DEFAULT 'hourglass_bottom',
    is_active BOOLEAN DEFAULT TRUE
);

-- Seed Default Lucknow Services
INSERT INTO services (name, category, rate_per_min, min_floor_minutes, description, icon_name)
VALUES
('Govt Office & Queue Waiting', 'Queue Assistance', 2.00, 30, 'Physical spot holding in GPO, RTO, Nagar Nigam, and passport queues', 'schedule'),
('Hospital OPD & Token Line', 'Healthcare Help', 2.50, 30, 'OPD slip generation, token counter waiting at KGMU, SGPGI, and Civil Hospital', 'local_hospital'),
('Temple Darshan Queue Waiter', 'Devotion & Queues', 2.00, 30, 'Line holding during festivals and Mangalwar at Hanuman Setu and Mankameshwar', 'temple_hindu'),
('Urgent Document & Parcel Courier', 'Hyper-Local Courier', 2.00, 30, 'Door-to-door physical document and file hand-over within Lucknow', 'local_shipping'),
('Bank Counter & Stamp Paper Line', 'Banking Assistance', 2.00, 30, 'Notary, registry office, and bank token waiting assistance', 'account_balance')
ON CONFLICT DO NOTHING;

-- 4. Orders Table (Full Task Lifecycle)
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(20) PRIMARY KEY, -- e.g. 'DN-89210'
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
    service_name VARCHAR(100) NOT NULL,
    rate_per_min NUMERIC(6, 2) NOT NULL DEFAULT 2.00,
    min_floor_minutes INTEGER NOT NULL DEFAULT 30,
    
    -- Location details
    address TEXT NOT NULL,
    landmark TEXT NOT NULL,
    meeting_instructions TEXT,
    latitude NUMERIC(10, 7),
    longitude NUMERIC(10, 7),
    
    -- Safety & Doorstep Handshake
    security_pin VARCHAR(4) NOT NULL, -- 4-digit PIN for meter start
    
    -- Lifecycle Status
    status VARCHAR(30) DEFAULT 'SEARCHING', 
    -- 'SEARCHING', 'ACCEPTED', 'ARRIVED', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED'
    
    -- Radar expansion wave
    search_radius_km INTEGER DEFAULT 3,
    
    -- Timing
    booked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    accepted_at TIMESTAMP WITH TIME ZONE,
    arrived_at TIMESTAMP WITH TIME ZONE,
    work_started_at TIMESTAMP WITH TIME ZONE,
    work_completed_at TIMESTAMP WITH TIME ZONE,
    
    -- Financials & Settlement (P2P Model)
    elapsed_minutes INTEGER DEFAULT 0,
    billable_minutes INTEGER DEFAULT 30,
    service_fare NUMERIC(8, 2) DEFAULT 60.00,
    tip_amount NUMERIC(8, 2) DEFAULT 0.00,
    total_payable NUMERIC(8, 2) DEFAULT 60.00,
    payment_method VARCHAR(30) DEFAULT 'UPI QR / App', -- 'UPI QR / App', 'Physical Cash'
    payment_confirmed BOOLEAN DEFAULT FALSE,
    
    special_instructions TEXT,
    is_urgent BOOLEAN DEFAULT FALSE
);

-- 5. Ratings & Reviews
CREATE TABLE IF NOT EXISTS ratings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(20) REFERENCES orders(id) ON DELETE CASCADE,
    customer_id UUID REFERENCES users(id) ON DELETE SET NULL,
    partner_id UUID REFERENCES partners(id) ON DELETE SET NULL,
    rating_stars INTEGER CHECK (rating_stars >= 1 AND rating_stars <= 5),
    tags TEXT[], -- e.g. ARRAY['Strict Punctuality', 'Followed Instructions']
    review_comment TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Emergency & SOS Distress Alerts
CREATE TABLE IF NOT EXISTS emergency_alerts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id VARCHAR(20),
    user_id UUID,
    latitude NUMERIC(10, 7) NOT NULL,
    longitude NUMERIC(10, 7) NOT NULL,
    status VARCHAR(20) DEFAULT 'ACTIVE', -- 'ACTIVE', 'RESOLVED'
    triggered_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    notes TEXT
);

-- Seed Sample Demo Partner for Immediate Testing
INSERT INTO partners (id, phone, full_name, aadhaar_number_masked, is_aadhaar_verified, is_police_verified, rating, total_orders, duty_status, current_lat, current_lng)
VALUES
('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', '+919876543210', 'Rahul Sharma', 'XXXX-XXXX-4819', TRUE, TRUE, 4.85, 142, 'ONLINE', 26.8467, 80.9462)
ON CONFLICT (phone) DO NOTHING;
