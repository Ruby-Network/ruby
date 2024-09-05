Dir.chdir('../frontend') do
  system("pnpm run build")
end
system("bundle exec puma -e development &")
