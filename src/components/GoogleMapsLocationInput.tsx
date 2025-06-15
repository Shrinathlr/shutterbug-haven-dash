
import React, { useEffect, useRef } from "react";

interface GoogleMapsLocationInputProps {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

// Update the Google Maps API key to the new one provided
export const GOOGLE_MAPS_API_KEY = "AIzaSyAW_mP-uCa1lWWahG6TT6LdjtDsWZYhNsA";

export const GoogleMapsLocationInput: React.FC<GoogleMapsLocationInputProps> = ({
  value,
  onChange,
  placeholder,
  className = "",
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Load Google Maps script only once
  useEffect(() => {
    if ((window as any).google) return; // already loaded
    const script = document.createElement("script");
    script.src =
      `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.onload = () => {
      // Google Maps script loaded
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!(window as any).google || !inputRef.current) return;
    // @ts-ignore
    const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
      types: ["(cities)"], // restrict to cities; can be "geocode" or custom types
    });
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place && place.formatted_address) {
        onChange(place.formatted_address);
      } else if (place && place.name) {
        onChange(place.name);
      }
    });
    // Clean up to remove listeners if needed
    return () => {
      // google autocomplete does not provide direct way to removeEventListener; left for GC
    };
  }, [inputRef.current, (window as any).google]);

  return (
    <input
      ref={inputRef}
      className={`w-48 md:w-56 lg:w-64 bg-background border-green-400/30 px-3 py-2 rounded focus:outline-none ${className}`}
      placeholder={placeholder || "Location"}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      type="text"
      autoComplete="off"
    />
  );
};
