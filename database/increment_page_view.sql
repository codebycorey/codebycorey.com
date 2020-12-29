CREATE OR REPLACE FUNCTION increment_page_view(page_slug TEXT)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    IF EXISTS (SELECT FROM pages WHERE slug=page_slug) THEN
        UPDATE pages
        SET view_count = view_count + 1,
            updated_at = now()
        WHERE slug = page_slug;
    ELSE
        INSERT into pages(slug) VALUES (page_slug);
    END IF;
END;
$$;
