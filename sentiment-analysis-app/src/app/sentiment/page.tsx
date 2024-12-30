'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Bar, Pie, Line } from 'react-chartjs-2'
import { SearchIcon, FilterIcon } from 'lucide-react'
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

export default function SentimentAnalysisPage() {
  const [timeRange, setTimeRange] = useState('7d')

  const sentimentDistributionData = {
    labels: ['Positif', 'Neutre', 'Négatif'],
    datasets: [{
      data: [65, 20, 15],
      backgroundColor: ['rgba(75, 192, 192, 0.8)', 'rgba(255, 206, 86, 0.8)', 'rgba(255, 99, 132, 0.8)'],
    }]
  }

  const sentimentTrendData = {
    labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
    datasets: [
      {
        label: 'Positif',
        data: [65, 59, 80, 81, 56, 55, 70],
        borderColor: 'rgba(75, 192, 192, 1)',
        tension: 0.1,
      },
      {
        label: 'Neutre',
        data: [28, 48, 40, 19, 86, 27, 30],
        borderColor: 'rgba(255, 206, 86, 1)',
        tension: 0.1,
      },
      {
        label: 'Négatif',
        data: [15, 30, 20, 10, 25, 18, 12],
        borderColor: 'rgba(255, 99, 132, 1)',
        tension: 0.1,
      }
    ]
  }

  const topKeywordsData = {
    labels: ['Excellent', 'Déçu', 'Qualité', 'Service', 'Prix', 'Recommande', 'Problème', 'Rapide', 'Difficile', 'Amélioration'],
    datasets: [{
      label: 'Fréquence',
      data: [120, 80, 100, 90, 85, 70, 60, 55, 50, 45],
      backgroundColor: 'rgba(54, 162, 235, 0.8)',
    }]
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Analyse des Sentiments</h1>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input type="text" placeholder="Rechercher..." className="pl-10" />
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">7 derniers jours</SelectItem>
              <SelectItem value="30d">30 derniers jours</SelectItem>
              <SelectItem value="90d">90 derniers jours</SelectItem>
              <SelectItem value="1y">1 an</SelectItem>
            </SelectContent>
          </Select>
          <Button>
            <FilterIcon className="mr-2 h-4 w-4" /> Filtrer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Distribution des Sentiments</CardTitle>
          </CardHeader>
          <CardContent>
            <Pie 
              data={sentimentDistributionData}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    position: 'bottom',
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendance des Sentiments</CardTitle>
          </CardHeader>
          <CardContent>
            <Line 
              data={sentimentTrendData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Mots-clés les Plus Fréquents</CardTitle>
          </CardHeader>
          <CardContent>
            <Bar 
              data={topKeywordsData}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Analyse Détaillée des Sentiments</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="font-medium">Score de Sentiment Global</span>
              <span className="text-2xl font-bold text-green-500">0.75</span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Positif</span>
                <span>65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-green-500 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Neutre</span>
                <span>20%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-yellow-500 h-2.5 rounded-full" style={{ width: '20%' }}></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span>Négatif</span>
                <span>15%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-red-500 h-2.5 rounded-full" style={{ width: '15%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}