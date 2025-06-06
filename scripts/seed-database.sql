-- Insert categories
INSERT INTO categories (name, name_az, slug) VALUES
('News', 'Xəbərlər', 'news'),
('Admissions', 'Qəbul', 'admissions'),
('Programs', 'Proqramlar', 'programs'),
('Student Life', 'Tələbə Həyatı', 'student-life'),
('Career', 'Karyera', 'career');

-- Insert sample colleges
INSERT INTO colleges (name, name_az, description, description_az, location, phone, email, is_active) VALUES
('Azerbaijan State University', 'Azərbaycan Dövlət Universiteti', 'Leading university in Azerbaijan', 'Azərbaycanda aparıcı universitet', 'Baku', '+994-12-123-45-67', 'info@asu.edu.az', true),
('Baku State University', 'Bakı Dövlət Universiteti', 'Premier educational institution', 'Aparıcı təhsil müəssisəsi', 'Baku', '+994-12-765-43-21', 'contact@bsu.edu.az', true),
('Azerbaijan Technical University', 'Azərbaycan Texniki Universiteti', 'Technical education excellence', 'Texniki təhsildə mükəmməllik', 'Baku', '+994-12-987-65-43', 'info@atu.edu.az', true);

-- Insert sample programs
INSERT INTO programs (name, name_az, description, duration, degree, college_id) VALUES
('Computer Science', 'Kompüter Elmləri', 'Modern computer science program', 4, 'bachelor', (SELECT id FROM colleges WHERE name = 'Azerbaijan State University')),
('Business Administration', 'Biznes İdarəetməsi', 'Comprehensive business program', 4, 'bachelor', (SELECT id FROM colleges WHERE name = 'Baku State University')),
('Engineering', 'Mühəndislik', 'Technical engineering program', 4, 'bachelor', (SELECT id FROM colleges WHERE name = 'Azerbaijan Technical University'));

-- Insert sample admin user (password: admin123)
INSERT INTO users (email, name, password_hash, role) VALUES
('admin@kollec.az', 'Admin User', '$2b$10$rOzJqQqQqQqQqQqQqQqQqO', 'admin');

-- Insert sample articles
INSERT INTO articles (title, title_az, content, content_az, excerpt, category_id, author_id, published, views) VALUES
('College Admission Guide 2025', '2025 Kollec Qəbul Bələdçisi', 'Complete guide for college admissions...', 'Kollec qəbulu üçün tam bələdçi...', 'Everything you need to know about college admissions', (SELECT id FROM categories WHERE slug = 'admissions'), (SELECT id FROM users WHERE role = 'admin'), true, 150),
('New Programs Available', 'Yeni Proqramlar Mövcuddur', 'Exciting new academic programs...', 'Maraqlı yeni akademik proqramlar...', 'Discover our latest academic offerings', (SELECT id FROM categories WHERE slug = 'programs'), (SELECT id FROM users WHERE role = 'admin'), true, 89);

-- Update category post counts
UPDATE categories SET post_count = (
  SELECT COUNT(*) FROM articles WHERE category_id = categories.id AND published = true
);
