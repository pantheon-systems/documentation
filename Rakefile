require 'html/proofer'

task default: %w[htmlproofer]
task :htmlproofer do
      HTML::Proofer.new("./output_dev", {
        :disable_external => true,
      }).run
end
