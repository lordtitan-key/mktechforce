DROP DATABASE IF EXISTS mktechforce;

CREATE DATABASE mktechforce
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE mktechforce;

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL UNIQUE,

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    role_id INT NOT NULL,

    first_name VARCHAR(100) NOT NULL,

    last_name VARCHAR(100) NOT NULL,

    email VARCHAR(150) NOT NULL UNIQUE,

    phone VARCHAR(20),

    password VARCHAR(255) NOT NULL,

    profile_image VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    last_login DATETIME NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)

);

CREATE TABLE permissions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) UNIQUE NOT NULL,

    slug VARCHAR(150) UNIQUE NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE role_permissions (

    id INT AUTO_INCREMENT PRIMARY KEY,

    role_id INT NOT NULL,

    permission_id INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_role_permissions_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_role_permissions_permission
        FOREIGN KEY (permission_id)
        REFERENCES permissions(id)
        ON DELETE CASCADE

);

INSERT INTO roles(name, description)

VALUES

('Super Admin','Full System Access'),

('Admin','Manage Website'),

('Sales','Lead Management'),

('HR','Career Management'),

('Content Writer','Manage Blogs'),

('Viewer','Read Only');

INSERT INTO permissions(name,slug)

VALUES

('Dashboard','dashboard'),

('Users','users'),

('Website Settings','website-settings'),

('Homepage CMS','homepage'),

('Services','services'),

('Portfolio','portfolio'),

('Blogs','blogs'),

('Testimonials','testimonials'),

('Team','team'),

('Careers','careers'),

('Leads','leads'),

('Newsletter','newsletter'),

('Media Library','media'),

('SEO','seo');

CREATE TABLE website_settings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    company_name VARCHAR(255) NOT NULL,

    website_title VARCHAR(255),

    tagline VARCHAR(255),

    logo VARCHAR(255),

    favicon VARCHAR(255),

    email VARCHAR(150),

    phone VARCHAR(20),

    alternate_phone VARCHAR(20),

    whatsapp VARCHAR(20),

    address TEXT,

    city VARCHAR(100),

    state VARCHAR(100),

    country VARCHAR(100),

    postal_code VARCHAR(20),

    google_map_iframe TEXT,

    business_hours TEXT,

    copyright TEXT,

    footer_description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE social_links (

    id INT AUTO_INCREMENT PRIMARY KEY,

    platform VARCHAR(100) NOT NULL,

    icon VARCHAR(100),

    url VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    display_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE menus (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(150) NOT NULL,

    slug VARCHAR(150),

    url VARCHAR(255),

    parent_id INT DEFAULT NULL,

    menu_type ENUM('Header','Footer'),

    display_order INT DEFAULT 0,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(parent_id)
    REFERENCES menus(id)
    ON DELETE SET NULL

);

CREATE TABLE homepage_sections (

    id INT AUTO_INCREMENT PRIMARY KEY,

    section_name VARCHAR(150) NOT NULL,

    title VARCHAR(255),

    subtitle TEXT,

    description LONGTEXT,

    image VARCHAR(255),

    button_text VARCHAR(100),

    button_link VARCHAR(255),

    is_active BOOLEAN DEFAULT TRUE,

    display_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE seo_settings (

    id INT AUTO_INCREMENT PRIMARY KEY,

    page_name VARCHAR(150),

    meta_title VARCHAR(255),

    meta_description TEXT,

    keywords TEXT,

    canonical_url VARCHAR(255),

    robots VARCHAR(100),

    og_title VARCHAR(255),

    og_description TEXT,

    og_image VARCHAR(255),

    twitter_title VARCHAR(255),

    twitter_description TEXT,

    twitter_image VARCHAR(255),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ON UPDATE CURRENT_TIMESTAMP

);

INSERT INTO website_settings (

company_name,
website_title,
tagline,
email,
phone,
city,
state,
country

)

VALUES

(

'MKTechForce',

'MKTechForce | Complete IT Solutions',

'Innovating Your Digital Future',

'info@mktechforce.com',

'9601587529',

'Ahmedabad',

'Gujarat',

'India'

);

INSERT INTO social_links
(platform,icon,url)

VALUES

('Facebook','facebook',''),

('Instagram','instagram',''),

('LinkedIn','linkedin',''),

('YouTube','youtube',''),

('GitHub','github','');

INSERT INTO seo_settings(

page_name,

meta_title,

meta_description,

keywords

)

VALUES

(

'home',

'MKTechForce | IT Company',

'MKTechForce provides Web Development, Mobile Apps, Software Development and Digital Solutions.',

'IT Company, Website Development, Software Development'

);

CREATE TABLE services (

    id INT AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    short_description TEXT,

    description LONGTEXT,

    icon VARCHAR(255),

    featured_image VARCHAR(255),

    banner_image VARCHAR(255),

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    display_order INT DEFAULT 0,

    is_featured BOOLEAN DEFAULT FALSE,

    is_active BOOLEAN DEFAULT TRUE,

    created_by INT,

    updated_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    FOREIGN KEY (updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL

);

CREATE TABLE service_features (

    id INT AUTO_INCREMENT PRIMARY KEY,

    service_id INT NOT NULL,

    feature_title VARCHAR(255) NOT NULL,

    feature_description TEXT,

    display_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE

);

CREATE TABLE service_gallery (

    id INT AUTO_INCREMENT PRIMARY KEY,

    service_id INT NOT NULL,

    image VARCHAR(255) NOT NULL,

    image_title VARCHAR(255),

    display_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE

);

CREATE TABLE service_process (

    id INT AUTO_INCREMENT PRIMARY KEY,

    service_id INT NOT NULL,

    step_number INT NOT NULL,

    title VARCHAR(255),

    description TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE

);

CREATE TABLE service_faqs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    service_id INT NOT NULL,

    question VARCHAR(255) NOT NULL,

    answer TEXT,

    display_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (service_id)
        REFERENCES services(id)
        ON DELETE CASCADE

);

INSERT INTO services
(
title,
slug,
short_description,
is_featured
)

VALUES

(
'Website Development',
'website-development',
'Professional responsive business websites.',
TRUE
),

(
'Web Application Development',
'web-application-development',
'Custom web applications for businesses.',
TRUE
),

(
'Mobile App Development',
'mobile-app-development',
'Android and iOS application development.',
TRUE
),

(
'UI/UX Design',
'ui-ux-design',
'Modern UI/UX design services.',
FALSE
),

(
'Digital Marketing',
'digital-marketing',
'SEO, Google Ads and Social Media Marketing.',
FALSE
),

(
'Cloud Solutions',
'cloud-solutions',
'Cloud migration and infrastructure management.',
FALSE
);

CREATE TABLE portfolio_categories (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    slug VARCHAR(150) NOT NULL UNIQUE,

    description TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE portfolios (

    id INT AUTO_INCREMENT PRIMARY KEY,

    category_id INT,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    client_name VARCHAR(255),

    project_url VARCHAR(255),

    github_url VARCHAR(255),

    short_description TEXT,

    description LONGTEXT,

    featured_image VARCHAR(255),

    banner_image VARCHAR(255),

    technologies TEXT,

    completion_date DATE,

    is_featured BOOLEAN DEFAULT FALSE,

    is_active BOOLEAN DEFAULT TRUE,

    created_by INT,

    updated_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(category_id)
        REFERENCES portfolio_categories(id)
        ON DELETE SET NULL,

    FOREIGN KEY(created_by)
        REFERENCES users(id)
        ON DELETE SET NULL,

    FOREIGN KEY(updated_by)
        REFERENCES users(id)
        ON DELETE SET NULL

);

CREATE TABLE portfolio_gallery (

    id INT AUTO_INCREMENT PRIMARY KEY,

    portfolio_id INT NOT NULL,

    image VARCHAR(255) NOT NULL,

    image_title VARCHAR(255),

    display_order INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(portfolio_id)
        REFERENCES portfolios(id)
        ON DELETE CASCADE

);

CREATE TABLE portfolio_technologies (

    id INT AUTO_INCREMENT PRIMARY KEY,

    portfolio_id INT NOT NULL,

    technology_name VARCHAR(150),

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(portfolio_id)
        REFERENCES portfolios(id)
        ON DELETE CASCADE

);

INSERT INTO portfolio_categories
(name,slug)

VALUES

('Website Development','website-development'),

('Web Application','web-application'),

('Mobile Application','mobile-application'),

('UI UX Design','ui-ux-design'),

('E-Commerce','e-commerce');

INSERT INTO portfolios(

category_id,

title,

slug,

client_name,

short_description,

is_featured

)

VALUES

(

1,

'MKTechForce Corporate Website',

'mktechforce-corporate-website',

'MKTechForce',

'Official IT company website developed using React and Node.js.',

TRUE

);

CREATE TABLE blog_categories (

    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(150) NOT NULL,

    slug VARCHAR(150) NOT NULL UNIQUE,

    description TEXT,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP

);

CREATE TABLE blogs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    category_id INT,

    author_id INT,

    title VARCHAR(255) NOT NULL,

    slug VARCHAR(255) NOT NULL UNIQUE,

    short_description TEXT,

    content LONGTEXT,

    featured_image VARCHAR(255),

    banner_image VARCHAR(255),

    meta_title VARCHAR(255),

    meta_description TEXT,

    meta_keywords TEXT,

    reading_time INT DEFAULT 5,

    views INT DEFAULT 0,

    status ENUM('Draft','Published','Scheduled') DEFAULT 'Draft',

    publish_date DATETIME,

    is_featured BOOLEAN DEFAULT FALSE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY(category_id)
        REFERENCES blog_categories(id)
        ON DELETE SET NULL,

    FOREIGN KEY(author_id)
        REFERENCES users(id)
        ON DELETE SET NULL

);

CREATE TABLE blog_tags (

    id INT AUTO_INCREMENT PRIMARY KEY,

    tag_name VARCHAR(150) NOT NULL,

    slug VARCHAR(150) NOT NULL UNIQUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE blog_tag_mapping (

    id INT AUTO_INCREMENT PRIMARY KEY,

    blog_id INT NOT NULL,

    tag_id INT NOT NULL,

    FOREIGN KEY(blog_id)
        REFERENCES blogs(id)
        ON DELETE CASCADE,

    FOREIGN KEY(tag_id)
        REFERENCES blog_tags(id)
        ON DELETE CASCADE

);

CREATE TABLE blog_comments (

    id INT AUTO_INCREMENT PRIMARY KEY,

    blog_id INT NOT NULL,

    name VARCHAR(150),

    email VARCHAR(150),

    comment TEXT,

    is_approved BOOLEAN DEFAULT FALSE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY(blog_id)
        REFERENCES blogs(id)
        ON DELETE CASCADE

);

INSERT INTO blog_categories
(name,slug)

VALUES

('Technology','technology'),

('Web Development','web-development'),

('Mobile Development','mobile-development'),

('Digital Marketing','digital-marketing'),

('Artificial Intelligence','artificial-intelligence');

INSERT INTO blog_tags
(tag_name,slug)

VALUES

('React','react'),

('NodeJS','nodejs'),

('JavaScript','javascript'),

('PHP','php'),

('MySQL','mysql');

INSERT INTO blogs(

category_id,

author_id,

title,

slug,

short_description,

content,

status,

is_featured

)

VALUES(

1,

1,

'Welcome to MKTechForce',

'welcome-to-mktechforce',

'Introduction to MKTechForce.',

'<p>This is the first blog of MKTechForce.</p>',

'Published',

TRUE

);

CREATE TABLE media_library (

    id INT AUTO_INCREMENT PRIMARY KEY,

    original_name VARCHAR(255) NOT NULL,

    file_name VARCHAR(255) NOT NULL,

    file_path VARCHAR(500) NOT NULL,

    mime_type VARCHAR(100),

    extension VARCHAR(20),

    file_size BIGINT,

    uploaded_by INT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (uploaded_by)
        REFERENCES users(id)
        ON DELETE SET NULL

);