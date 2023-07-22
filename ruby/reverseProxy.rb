use Rack::ReverseProxy do
  reverse_proxy /^\/gms(\/.*)$/, 'http://rawcdn.githack.com/$1'
end
