import React from 'react';
import { render, screen } from '@testing-library/react';
import DashboardView from '../views/DashboardView.jsx'
import { useQuery } from "@tanstack/react-query";

jest.mock('@tanstack/react-query');
jest.mock('../components/MovieCard.jsx', () => {
    return () => <div>Mocked Child Component</div>;
  });

describe("DashboardView test", ()=> {
    it('Manage handle click Next', ()=> {
        useQuery.mockReturnValue({
            data: { results: [
                { id:1, title: 'movie title', backdrop_path: "path", original_title: "movie title"}
            ], total_pages: 1 },
            isError: false,
            isLoading: false
          });
        render(<DashboardView/>)
    })
    it('Manage handle click back', ()=> {
        useQuery.mockReturnValue({
            data: { results: [
                { id:1, title: 'movie title', backdrop_path: "path", original_title: "movie title"}
            ], total_pages: 1 },
            isError: false,
            isLoading: false
          });
        render(<DashboardView/>)
    })
    it('Manage pagination', ()=> {
        useQuery.mockReturnValue({
            data: { results: [
                { id:1, title: 'movie title', backdrop_path: "path", original_title: "movie title"}
            ], total_pages: 1 },
            isError: false,
            isLoading: false
          });
        render(<DashboardView/>)
    })
})

