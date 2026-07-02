#!/usr/bin/env python3
"""Small local server that disables browser caching during Deutsch-WiPA development."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import sys

class NoCacheHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()

    def send_head(self):
        # Ignore If-Modified-Since/If-None-Match so / never returns a stale 304.
        self.headers.replace_header("If-Modified-Since", "") if "If-Modified-Since" in self.headers else None
        self.headers.replace_header("If-None-Match", "") if "If-None-Match" in self.headers else None
        return super().send_head()

if __name__ == "__main__":
    port = int(sys.argv[1]) if len(sys.argv) > 1 else 8000
    httpd = ThreadingHTTPServer(("127.0.0.1", port), NoCacheHandler)
    print(f"Serving without cache on http://localhost:{port}/?v=25.0.0")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\nStopped.")
