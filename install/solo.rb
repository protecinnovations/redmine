root = File.expand_path(File.dirname(__FILE__)) + '/chef-repo'

file_cache_path root
cookbook_path root + '/cookbooks'
role_path root + '/roles'

