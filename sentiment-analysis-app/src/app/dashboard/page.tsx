'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { StarIcon, TrendingUpIcon, TrendingDownIcon, DollarSignIcon, ShoppingCartIcon, MessageSquareIcon, SearchIcon, FilterIcon } from 'lucide-react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
)

export default function Dashboard() {
  const [dateRange, setDateRange] = useState([2011, 2018])
  
  const sentiments = [
    'anger', 'anticipation', 'disgust', 'fear',
    'joy', 'negative', 'positive', 'sadness',
    'surprise', 'trust'
  ]

  const wordFrequencyData = {
    labels: ['positive', 'trust', 'anticipation', 'joy', 'negative', 'sadness', 'anger', 'fear', 'surprise', 'disgust'],
    datasets: [{
      label: 'Word Frequency',
      data: [407, 305, 264, 259, 220, 134, 115, 107, 90, 78],
      backgroundColor: 'rgba(255, 99, 132, 0.8)',
    }]
  }

  const reviewsClassificationData = {
    labels: ['Positive', 'Negative'],
    datasets: [{
      data: [72, 28],
      backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 99, 132, 0.8)'],
    }]
  }

  const reviewsTrendData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Positive',
        data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Negative',
        data: [28, 48, 40, 19, 86, 27, 90, 28, 48, 40, 19, 86],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      }
    ]
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Sentiment Analysis Dashboard</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Search..." className="pl-10" />
          </div>
          <Button variant="outline">
            <FilterIcon className="mr-2 h-4 w-4" /> Filter
          </Button>
        </div>
      </div>
      
      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium">Date Range</label>
              <Slider
                defaultValue={[2011, 2018]}
                min={2011}
                max={2018}
                step={1}
                className="mt-2"
                onValueChange={setDateRange}
              />
              <div className="mt-1 text-sm text-gray-500 flex justify-between">
                <span>{dateRange[0]}</span>
                <span>{dateRange[1]}</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Products</label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All Products" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium">Rating</label>
              <Select>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="All Ratings" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Sentiment Tags */}
      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Sentiment Tags</h2>
          <div className="flex flex-wrap gap-2">
            {sentiments.map((sentiment) => (
              <Badge key={sentiment} variant="secondary" className="capitalize">
                {sentiment}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Average Rating</p>
                <h3 className="text-2xl font-bold">4.3</h3>
              </div>
              <div className="flex">
                {[1, 2, 3, 4].map((i) => (
                  <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
                <StarIcon className="w-5 h-5 text-gray-300 fill-current" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Reviews</p>
                <h3 className="text-2xl font-bold">1,234</h3>
              </div>
              <MessageSquareIcon className="w-8 h-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Sentiment Score</p>
                <h3 className="text-2xl font-bold">72%</h3>
              </div>
              <TrendingUpIcon className="w-8 h-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Products Analyzed</p>
                <h3 className="text-2xl font-bold">156</h3>
              </div>
              <ShoppingCartIcon className="w-8 h-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Word Frequency by Sentiment</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              data={wordFrequencyData} 
              options={{ 
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
              }} 
              height={300}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reviews Classification</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie 
              data={reviewsClassificationData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={300}
            />
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Review Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <Line 
              data={reviewsTrendData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
              }}
              height={300}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}