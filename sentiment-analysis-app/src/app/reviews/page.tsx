'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import { StarIcon, SearchIcon, FilterIcon } from 'lucide-react'

// Types pour les revues et les filtres
type Review = {
  id: number
  author: string
  rating: number
  date: string
  content: string
  sentiment: 'positive' | 'negative' | 'neutral'
}

type Filters = {
  search: string
  rating: string
  sentiment: string
}

// Données factices pour les revues
const reviewsData: Review[] = [
  { id: 1, author: 'John Doe', rating: 5, date: '2024-03-15', content: 'Excellent produit, je le recommande vivement !', sentiment: 'positive' },
  { id: 2, author: 'Jane Smith', rating: 2, date: '2024-03-14', content: 'Déçu par la qualité, ne vaut pas le prix.', sentiment: 'negative' },
  { id: 3, author: 'Alice Johnson', rating: 4, date: '2024-03-13', content: 'Bon produit dans l'ensemble, quelques petits défauts.', sentiment: 'neutral' },
  { id: 4, author: 'Bob Wilson', rating: 1, date: '2024-03-12', content: 'Terrible expérience, à éviter absolument.', sentiment: 'negative' },
  { id: 5, author: 'Emma Brown', rating: 5, date: '2024-03-11', content: 'Parfait ! Exactement ce que je cherchais.', sentiment: 'positive' },
]

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>(reviewsData)
  const [filters, setFilters] = useState<Filters>({
    search: '',
    rating: '',
    sentiment: '',
  })

  const handleFilterChange = (key: keyof Filters, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const applyFilters = () => {
    let filteredReviews = reviewsData

    if (filters.search) {
      filteredReviews = filteredReviews.filter(review => 
        review.content.toLowerCase().includes(filters.search.toLowerCase()) ||
        review.author.toLowerCase().includes(filters.search.toLowerCase())
      )
    }

    if (filters.rating) {
      filteredReviews = filteredReviews.filter(review => review.rating === parseInt(filters.rating))
    }

    if (filters.sentiment) {
      filteredReviews = filteredReviews.filter(review => review.sentiment === filters.sentiment)
    }

    setReviews(filteredReviews)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Revues des clients</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Rechercher..."
              className="pl-10"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
            />
          </div>
          <Select value={filters.rating} onValueChange={(value) => handleFilterChange('rating', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par note" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les notes</SelectItem>
              <SelectItem value="5">5 étoiles</SelectItem>
              <SelectItem value="4">4 étoiles</SelectItem>
              <SelectItem value="3">3 étoiles</SelectItem>
              <SelectItem value="2">2 étoiles</SelectItem>
              <SelectItem value="1">1 étoile</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.sentiment} onValueChange={(value) => handleFilterChange('sentiment', value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrer par sentiment" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Tous les sentiments</SelectItem>
              <SelectItem value="positive">Positif</SelectItem>
              <SelectItem value="neutral">Neutre</SelectItem>
              <SelectItem value="negative">Négatif</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={applyFilters}>
            <FilterIcon className="mr-2 h-4 w-4" /> Appliquer les filtres
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{review.author}</span>
                    <div className="flex">
                      {Array(5).fill(0).map((_, i) => (
                        <StarIcon
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{review.date}</p>
                </div>
                <Badge className={`${
                  review.sentiment === 'positive' ? 'bg-green-100 text-green-800' :
                  review.sentiment === 'negative' ? 'bg-red-100 text-red-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {review.sentiment}
                </Badge>
              </div>
              <p className="mt-4">{review.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}