use Rack::ReverseProxy do
  reverse_proxy /^\/gms(\/.*)$/, 'https://rawcdn.githack.com/$1'
end
