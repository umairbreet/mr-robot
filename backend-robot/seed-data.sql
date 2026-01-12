-- Insert sample content cards for testing
INSERT INTO content_cards (title, description, image_url) VALUES
('NEURAL_NETWORK_01', 'Advanced AI processing unit with quantum capabilities', 'https://images.unsplash.com/photo-1555255707-c07966088b7b?w=400'),
('DATA_VAULT_SECURE', 'Encrypted storage with 256-bit AES encryption', 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400'),
('SYSTEM_MONITOR_ACTIVE', 'Real-time system monitoring and alerts', 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400')
ON CONFLICT DO NOTHING;
