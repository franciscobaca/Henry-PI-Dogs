import { render, screen } from '@testing-library/react';
import LandingPage from './LandingPage'


describe("Landing Page", () => {
    test("Should render Landing", () => {
      render(<LandingPage />);
    });
  });