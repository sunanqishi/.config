 Plug 'tmhedberg/SimpylFold', { 'for' :['python', 'vim-plug'] }
 59 Plug 'Vimjas/vim-python-pep8-indent', { 'for' :['python', 'vim-plug'] }
 60 Plug 'numirias/semshi', { 'do': ':UpdateRemotePlugins', 'for' :['python', 'vim-plug'] }    // python代码高亮
 61 "Plug 'vim-scripts/indentpython.vim', { 'for' :['python', 'vim-plug'] }
 62 "Plug 'plytophogy/vim-virtualenv', { 'for' :['python', 'vim-plug'] }
 63 Plug 'tweekmonster/braceless.vim'
 64
 65 " Markdown
 66 Plug 'iamcco/markdown-preview.nvim', { 'do': { -> mkdp#util#install_sync() }, 'for' :['markdown', 'vim-plug'] }
 67 Plug 'dhruvasagar/vim-table-mode', { 'on': 'TableModeToggle' }
 68 Plug 'mzlogin/vim-markdown-toc', { 'for': ['gitignore', 'markdown'] }
 69 Plug 'theniceboy/bullets.vim'
 70
 71 " Tex
 72 Plug 'lervag/vimtex'